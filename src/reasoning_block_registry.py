from typing import List, Optional, Dict, Any
from src.core.models import ReasoningBlock, ReasoningBlockVersion
from src.core.storage import TraceStorage

class ReasoningBlockRegistry:
    '''
    Registry for versioned reasoning modules.
    Implements Requirement CM-1.
    '''
    def __init__(self, storage: TraceStorage):
        self.storage = storage

    def create_block(self, name: str, description: str, purpose: str, tags: List[str] = None) -> ReasoningBlock:
        block = ReasoningBlock(
            name=name,
            description=description,
            purpose=purpose,
            tags=tags or []
        )
        self.storage.save_reasoning_block(block)
        return block

    def add_version(self, block_id: str, content: str, target_model: str, 
                    golden_path_benchmark_id: Optional[str] = None, 
                    is_stable: bool = False, metadata: Dict[str, Any] = None) -> ReasoningBlockVersion:
        # Auto-increment version number BEFORE creating the Pydantic model
        versions = self.storage.list_block_versions(block_id)
        version_number = len(versions) + 1
        
        version = ReasoningBlockVersion(
            block_id=block_id,
            version_number=version_number,
            content=content,
            target_model=target_model,
            golden_path_benchmark_id=golden_path_benchmark_id,
            is_stable=is_stable,
            metadata=metadata or {}
        )
        
        self.storage.save_block_version(version)
        return version

    def get_latest_stable(self, block_id: str) -> Optional[ReasoningBlockVersion]:
        data = self.storage.get_block_version(block_id)
        if not data:
            return None
        return ReasoningBlockVersion(**data)

    def get_version(self, block_id: str, version_number: int) -> Optional[ReasoningBlockVersion]:
        data = self.storage.get_block_version(block_id, version_number)
        if not data:
            return None
        return ReasoningBlockVersion(**data)

    def list_versions(self, block_id: str) -> List[ReasoningBlockVersion]:
        data_list = self.storage.list_block_versions(block_id)
        return [ReasoningBlockVersion(**d) for d in data_list]
