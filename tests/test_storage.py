import unittest
import os
from src.core.storage import TraceStorage

class TestTraceStorage(unittest.TestCase):
    def setUp(self):
        self.db_name = "test_tracewhisper.db"
        self.storage = TraceStorage(db_path=self.db_name)
        self.org_id = "test-org"

    def tearDown(self):
        if os.path.exists(self.db_name):
            os.remove(self.db_name)

    def test_save_and_get_trace(self):
        trace_id = "trace-123"
        metadata = {"model": "gpt-4", "env": "prod"}
        self.storage.save_trace(trace_id, self.org_id, "agent-1", "session-1", metadata)
        
        trace = self.storage.get_trace_metadata(trace_id, self.org_id)
        self.assertIsNotNone(trace)
        self.assertEqual(trace['agent_id'], "agent-1")
        self.assertEqual(trace['metadata'], metadata)

    def test_append_and_get_logs(self):
        trace_id = "trace-123"
        self.storage.save_trace(trace_id, self.org_id, "agent-1", "session-1", {})
        
        self.storage.append_log(trace_id, "Step 1", step_index=0, raw_payload={"val": 1})
        self.storage.append_log(trace_id, "Step 2", step_index=1, raw_payload={"val": 2})
        
        logs = self.storage.get_trace_logs(trace_id, self.org_id)
        self.assertEqual(len(logs), 2)
        self.assertEqual(logs[0]['message'], "Step 1")
        self.assertEqual(logs[0]['raw_payload'], {"val": 1})
        self.assertEqual(logs[1]['message'], "Step 2")

    def test_save_narrative(self):
        trace_id = "trace-123"
        self.storage.save_trace(trace_id, self.org_id, "agent-1", "session-1", {})
        self.storage.save_narrative(trace_id, "0-5", "The agent started by searching for X.")
        
        # We don't have a get_narrative method yet, but we can check the DB
        import sqlite3
        conn = sqlite3.connect(self.db_name)
        cursor = conn.cursor()
        cursor.execute('SELECT content FROM narratives WHERE trace_id = ?', (trace_id,))
        row = cursor.fetchone()
        self.assertEqual(row[0], "The agent started by searching for X.")
        conn.close()

    def test_recent_traces(self):
        self.storage.save_trace("t1", self.org_id, "a1", "s1", {})
        self.storage.save_trace("t2", self.org_id, "a2", "s2", {})
        
        recent = self.storage.get_recent_traces(self.org_id, limit=1)
        self.assertEqual(len(recent), 1)
        self.assertEqual(recent[0]['id'], "t2")

if __name__ == "__main__":
    unittest.main()
