import sqlite3
import json
from datetime import datetime
from typing import List, Dict, Any, Optional
from pathlib import Path

class TraceStorage:
    """
    Handles persistence of agent traces, logs, and narratives using SQLite.
    """
    def __init__(self, db_path: str = "tracewhisper.db"):
        self.db_path = db_path
        self._init_db()

    def _get_connection(self):
        return sqlite3.connect(self.db_path)

    def _init_db(self):
        """Initializes the database schema."""
        with self._get_connection() as conn:
            cursor = conn.cursor()
            
            # Traces table: High-level metadata about an agent run
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS traces (
                    id TEXT PRIMARY KEY,
                    agent_id TEXT,
                    session_id TEXT,
                    start_time TIMESTAMP,
                    end_time TIMESTAMP,
                    metadata TEXT,
                    status TEXT
                )
            ''')
            
            # Logs table: Individual log entries
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
            
            # Narratives table: Synthesized narratives for specific segments
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
            conn.commit()

    def save_trace(self, trace_id: str, agent_id: str, session_id: str, 
                   metadata: Dict[str, Any], status: str = "running"):
        """Creates or updates a trace record."""
        with self._get_connection() as conn:
            cursor = conn.cursor()
            start_time = datetime.utcnow().isoformat()
            cursor.execute('''
                INSERT INTO traces (id, agent_id, session_id, start_time, metadata, status)
                VALUES (?, ?, ?, ?, ?, ?)
                ON CONFLICT(id) DO UPDATE SET 
                    status=excluded.status, 
                    metadata=excluded.metadata
            ''', (trace_id, agent_id, session_id, start_time, json.dumps(metadata), status))
            conn.commit()

    def update_trace_end(self, trace_id: str, status: str = "completed"):
        """Marks a trace as finished."""
        end_time = datetime.utcnow().isoformat()
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute('UPDATE traces SET end_time = ?, status = ? WHERE id = ?', 
                           (end_time, status, trace_id))
            conn.commit()

    def append_log(self, trace_id: str, message: str, level: str = "INFO", 
                   raw_payload: Optional[Dict[str, Any]] = None, step_index: Optional[int] = None):
        """Appends a single log entry to a trace."""
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
        """Saves a synthesized narrative segment."""
        timestamp = datetime.utcnow().isoformat()
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute('''
                INSERT INTO narratives (trace_id, step_range, content, timestamp)
                VALUES (?, ?, ?, ?)
            ''', (trace_id, step_range, content, timestamp))
            conn.commit()

    def get_trace_logs(self, trace_id: str) -> List[Dict[str, Any]]:
        """Retrieves all logs for a given trace, ordered by step index."""
        with self._get_connection() as conn:
            conn.row_factory = sqlite3.Row
            cursor = conn.cursor()
            cursor.execute('SELECT * FROM logs WHERE trace_id = ? ORDER BY step_index ASC', (trace_id,))
            rows = cursor.fetchall()
            
            logs = []
            for row in rows:
                log = dict(row)
                if log['raw_payload']:
                    log['raw_payload'] = json.loads(log['raw_payload'])
                logs.append(log)
            return logs

    def get_recent_traces(self, limit: int = 10) -> List[Dict[str, Any]]:
        """Returns a list of the most recently started traces."""
        with self._get_connection() as conn:
            conn.row_factory = sqlite3.Row
            cursor = conn.cursor()
            cursor.execute('SELECT * FROM traces ORDER BY start_time DESC LIMIT ?', (limit,))
            return [dict(row) for row in cursor.fetchall()]

    def get_trace_metadata(self, trace_id: str) -> Optional[Dict[str, Any]]:
        """Retrieves metadata for a specific trace."""
        with self._get_connection() as conn:
            conn.row_factory = sqlite3.Row
            cursor = conn.cursor()
            cursor.execute('SELECT * FROM traces WHERE id = ?', (trace_id,))
            row = cursor.fetchone()
            if row:
                data = dict(row)
                if data['metadata']:
                    data['metadata'] = json.loads(data['metadata'])
                return data
        return None
