import sqlite3
import json
from datetime import datetime
from typing import List, Dict, Any, Optional
from pathlib import Path

class TraceStorage:
    '''
    Handles persistence of agent traces, logs, and narratives using SQLite.
    Updated for v2.4 to support Multi-tenancy, RBAC, and Hierarchical Vaults.
    '''
    def __init__(self, db_path: str = 'tracewhisper.db'):
        self.db_path = db_path
        self._init_db()

    def _get_connection(self):
        return sqlite3.connect(self.db_path)

    def _init_db(self):
        '''Initializes the database schema with Enterprise v2.4 updates.'''
        with self._get_connection() as conn:
            cursor = conn.cursor()
            
            # Organizations for multi-tenancy
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS organizations (
                    id TEXT PRIMARY KEY,
                    name TEXT NOT NULL,
                    created_at TIMESTAMP
                )
            ''')
            
            # Users and Roles
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS users (
                    id TEXT PRIMARY KEY,
                    org_id TEXT,
                    username TEXT NOT NULL,
                    role TEXT NOT NULL,
                    created_at TIMESTAMP,
                    FOREIGN KEY (org_id) REFERENCES organizations (id)
                )
            ''')
            
            # Hierarchical Vaults
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS vaults (
                    id TEXT PRIMARY KEY,
                    org_id TEXT,
                    name TEXT NOT NULL,
                    parent_vault_id TEXT,
                    created_at TIMESTAMP,
                    FOREIGN KEY (org_id) REFERENCES organizations (id),
                    FOREIGN KEY (parent_vault_id) REFERENCES vaults (id)
                )
            ''')

            # Traces table: Added org_id for isolation
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS traces (
                    id TEXT PRIMARY KEY,
                    org_id TEXT,
                    agent_id TEXT,
                    session_id TEXT,
                    start_time TIMESTAMP,
                    end_time TIMESTAMP,
                    metadata TEXT,
                    status TEXT,
                    FOREIGN KEY (org_id) REFERENCES organizations (id)
                )
            ''')
            
            # Logs table
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS logs (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    trace_id TEXT,
                    timestamp TIMESTAMP,
                    level TEXT,
                    message TEXT,
                    raw_payload TEXT,
                    step_index INTEGER,
                    FOREIGN KEY (trace_id) REFERENCES traces (id)
                )
            ''')
            
            # Narratives table
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS narratives (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    trace_id TEXT,
                    step_range TEXT,
                    content TEXT,
                    timestamp TIMESTAMP,
                    FOREIGN KEY (trace_id) REFERENCES traces (id)
                )
            ''')

            # Pattern Vault table: Updated project_id -> vault_id for hierarchy support
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS pattern_vault (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    vault_id TEXT,
                    failure_embedding BLOB,
                    failure_description TEXT,
                    correction_prompt TEXT,
                    success_rate REAL,
                    created_at TIMESTAMP,
                    FOREIGN KEY (vault_id) REFERENCES vaults (id)
                )
            ''')
            conn.commit()

    def create_organization(self, org_id: str, name: str):
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute('INSERT INTO organizations (id, name, created_at) VALUES (?, ?, ?)', 
                           (org_id, name, datetime.utcnow().isoformat()))
            conn.commit()

    def create_user(self, user_id: str, org_id: str, username: str, role: str):
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute('INSERT INTO users (id, org_id, username, role, created_at) VALUES (?, ?, ?, ?, ?)', 
                           (user_id, org_id, username, role, datetime.utcnow().isoformat()))
            conn.commit()

    def create_vault(self, vault_id: str, org_id: str, name: str, parent_vault_id: Optional[str] = None):
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute('INSERT INTO vaults (id, org_id, name, parent_vault_id, created_at) VALUES (?, ?, ?, ?, ?)', 
                           (vault_id, org_id, name, parent_vault_id, datetime.utcnow().isoformat()))
            conn.commit()

    def save_trace(self, trace_id: str, org_id: str, agent_id: str, session_id: str, 
                   metadata: Dict[str, Any], status: str = 'running'):
        with self._get_connection() as conn:
            cursor = conn.cursor()
            start_time = datetime.utcnow().isoformat()
            cursor.execute('''
                INSERT INTO traces (id, org_id, agent_id, session_id, start_time, metadata, status)
                VALUES (?, ?, ?, ?, ?, ?, ?)
                ON CONFLICT(id) DO UPDATE SET 
                    status=excluded.status, 
                    metadata=excluded.metadata
            ''', (trace_id, org_id, agent_id, session_id, start_time, json.dumps(metadata), status))
            conn.commit()

    def update_trace_end(self, trace_id: str, status: str = 'completed'):
        end_time = datetime.utcnow().isoformat()
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute('UPDATE traces SET end_time = ?, status = ? WHERE id = ?', 
                           (end_time, status, trace_id))
            conn.commit()

    def append_log(self, trace_id: str, message: str, level: str = 'INFO', 
                   raw_payload: Optional[Dict[str, Any]] = None, step_index: Optional[int] = None):
        timestamp = datetime.utcnow().isoformat()
        payload_json = json.dumps(raw_payload) if raw_payload else None
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute('''
                INSERT INTO logs (trace_id, timestamp, level, message, raw_payload, step_index)
                VALUES (?, ?, ?, ?, ?, ?)
            ''', (trace_id, timestamp, level, message, payload_json, step_index))
            conn.commit()

    def save_narrative(self, trace_id: str, step_range: str, content: str):
        timestamp = datetime.utcnow().isoformat()
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute('''
                INSERT INTO narratives (trace_id, step_range, content, timestamp)
                VALUES (?, ?, ?, ?)
            ''', (trace_id, step_range, content, timestamp))
            conn.commit()

    def get_trace_logs(self, trace_id: str, org_id: str) -> List[Dict[str, Any]]:
        with self._get_connection() as conn:
            conn.row_factory = sqlite3.Row
            cursor = conn.cursor()
            cursor.execute('''
                SELECT l.* FROM logs l 
                JOIN traces t ON l.trace_id = t.id 
                WHERE l.trace_id = ? AND t.org_id = ? 
                ORDER BY l.step_index ASC
            ''', (trace_id, org_id))
            rows = cursor.fetchall()
            logs = []
            for row in rows:
                log = dict(row)
                if log['raw_payload']:
                    log['raw_payload'] = json.loads(log['raw_payload'])
                logs.append(log)
            return logs

    def get_recent_traces(self, org_id: str, limit: int = 10) -> List[Dict[str, Any]]:
        with self._get_connection() as conn:
            conn.row_factory = sqlite3.Row
            cursor = conn.cursor()
            cursor.execute('SELECT * FROM traces WHERE org_id = ? ORDER BY start_time DESC LIMIT ?', (org_id, limit))
            return [dict(row) for row in cursor.fetchall()]

    def get_trace_metadata(self, trace_id: str, org_id: str) -> Optional[Dict[str, Any]]:
        with self._get_connection() as conn:
            conn.row_factory = sqlite3.Row
            cursor = conn.cursor()
            cursor.execute('SELECT * FROM traces WHERE id = ? AND org_id = ?', (trace_id, org_id))
            row = cursor.fetchone()
            if row:
                data = dict(row)
                if data['metadata']:
                    data['metadata'] = json.loads(data['metadata'])
                return data
        return None

    def save_pattern(self, vault_id: str, failure_embedding: bytes, failure_description: str, 
                     correction_prompt: str, success_rate: float):
        timestamp = datetime.utcnow().isoformat()
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute('''
                INSERT INTO pattern_vault (vault_id, failure_embedding, failure_description, correction_prompt, success_rate, created_at)
                VALUES (?, ?, ?, ?, ?, ?)
            ''', (vault_id, failure_embedding, failure_description, correction_prompt, success_rate, timestamp))
            conn.commit()

    def query_patterns_by_vault(self, vault_id: str, limit: int = 5) -> List[Dict[str, Any]]:
        with self._get_connection() as conn:
            conn.row_factory = sqlite3.Row
            cursor = conn.cursor()
            cursor.execute('SELECT * FROM pattern_vault WHERE vault_id = ? ORDER BY created_at DESC LIMIT ?', (vault_id, limit))
            return [dict(row) for row in cursor.fetchall()]

    def get_vault_hierarchy(self, vault_id: str) -> List[str]:
        hierarchy = []
        current_id = vault_id
        with self._get_connection() as conn:
            while current_id:
                cursor = conn.cursor()
                cursor.execute('SELECT parent_vault_id FROM vaults WHERE id = ?', (current_id,))
                row = cursor.fetchone()
                if not row:
                    break
                hierarchy.append(current_id)
                current_id = row[0]
        return hierarchy[::-1]

    def _init_regression_tests_table(self):
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS regression_tests (
                    id TEXT PRIMARY KEY,
                    agent_id TEXT,
                    name TEXT,
                    input_text TEXT,
                    expected_output TEXT,
                    golden_path_keywords TEXT,
                    priority TEXT,
                    created_at TIMESTAMP
                )
            ''')
            conn.commit()

    def save_regression_test(self, test_id: str, agent_id: str, name: str, input_text: str, 
                             expected_output: str, golden_path_keywords: List[str], priority: str = 'medium'):
        with self._get_connection() as conn:
            cursor = conn.cursor()
            # Use REPLACE to avoid UNIQUE constraint failures during tests or updates
            cursor.execute('''
                INSERT OR REPLACE INTO regression_tests (id, agent_id, name, input_text, expected_output, golden_path_keywords, priority, created_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            ''', (test_id, agent_id, name, input_text, expected_output, json.dumps(golden_path_keywords), priority, datetime.utcnow().isoformat()))
            conn.commit()

    def get_regression_tests_for_agent(self, agent_id: str) -> List[Dict[str, Any]]:
        with self._get_connection() as conn:
            conn.row_factory = sqlite3.Row
            cursor = conn.cursor()
            cursor.execute('SELECT * FROM regression_tests WHERE agent_id = ?', (agent_id,))
            rows = cursor.fetchall()
            tests = []
            for row in rows:
                test = dict(row)
                if test['golden_path_keywords']:
                    test['golden_path_keywords'] = json.loads(test['golden_path_keywords'])
                tests.append(test)
            return tests
