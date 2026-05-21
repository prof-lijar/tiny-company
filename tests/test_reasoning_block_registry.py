import pytest
from src.core.storage import TraceStorage
from src.reasoning_block_registry import ReasoningBlockRegistry
from src.core.models import ReasoningBlock, ReasoningBlockVersion
import os

@pytest.fixture
def registry():
    db_path = 'test_registry.db'
    storage = TraceStorage(db_path=db_path)
    # Force initialization of the blocks tables
    storage._init_db() 
    reg = ReasoningBlockRegistry(storage)
    yield reg, storage, db_path
    if os.path.exists(db_path):
        os.remove(db_path)

def test_create_and_retrieve_block(registry):
    reg, storage, _ = registry
    block = reg.create_block(
        name="Legal Compliance Block",
        description="Ensures output adheres to GDPR",
        purpose="Compliance",
        tags=["legal", "gdpr"]
    )
    
    # Test adding versions
    v1 = reg.add_version(
        block_id=block.block_id,
        content="Check for PII in the output.",
        target_model="gpt-4o",
        is_stable=True
    )
    
    v2 = reg.add_version(
        block_id=block.block_id,
        content="Check for PII and cross-reference with GDPR Article 5.",
        target_model="gpt-4o",
        is_stable=False
    )
    
    # Test latest stable
    stable = reg.get_latest_stable(block.block_id)
    assert stable is not None
    assert stable.version_number == 1
    assert stable.content == "Check for PII in the output."
    
    # Test specific version
    v2_retrieved = reg.get_version(block.block_id, 2)
    assert v2_retrieved is not None
    assert v2_retrieved.content == "Check for PII and cross-reference with GDPR Article 5."
    
    # Test version listing
    versions = reg.list_versions(block.block_id)
    assert len(versions) == 2
    assert versions[0].version_number == 2
    assert versions[1].version_number == 1

def test_nonexistent_block(registry):
    reg, _, _ = registry
    assert reg.get_latest_stable("non-existent") is None
    assert reg.get_version("non-existent", 1) is None
