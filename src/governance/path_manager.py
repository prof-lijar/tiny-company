from typing import List, Dict, Any, Optional
from src.core.models import GoldenPath
import uuid
from datetime import datetime

class PathManager:
    """
    Lifecycle management of Golden Paths.
    """
    def __init__(self):
        self.active_paths: Dict[str, GoldenPath] = {}
        self.history: List[GoldenPath] = []

    def promote_to_production(self, path: GoldenPath):
        self.active_paths[path.agent_id] = path
        self.history.append(path)
        print(f"Promoted Golden Path {path.path_id} for agent {path.agent_id} to production.")

    def get_active_path(self, agent_id: str) -> Optional[GoldenPath]:
        return self.active_paths.get(agent_id)

    def update_path_version(self, agent_id: str, new_path: GoldenPath):
        new_path.version += 1
        self.active_paths[agent_id] = new_path
        self.history.append(new_path)
