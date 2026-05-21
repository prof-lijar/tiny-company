import pytest
import os
from src.core.storage import TraceStorage
from src.enterprise_core import context, RBACManager
from src.pattern_vault import PatternVault
from src.core.models import ReasoningPattern

@pytest.fixture
def storage(tmp_path):
    # Use a temporary database file for each test to ensure isolation
    db_file = tmp_path / "test_enterprise.db"
    s = TraceStorage(str(db_file))
    return s

@pytest.fixture
def vault(storage):
    return PatternVault(storage)

def test_multi_tenancy_isolation(storage):
    # Setup Orgs
    storage.create_organization("org1", "Company One")
    storage.create_organization("org2", "Company Two")
    
    # Create traces for both
    storage.save_trace("t1", "org1", "agent1", "s1", {"meta": "data1"})
    storage.save_trace("t2", "org2", "agent2", "s2", {"meta": "data2"})
    
    # Org 1 should not see Org 2's traces
    traces_org1 = storage.get_recent_traces("org1")
    assert len(traces_org1) == 1
    assert traces_org1[0]['id'] == "t1"
    
    traces_org2 = storage.get_recent_traces("org2")
    assert len(traces_org2) == 1
    assert traces_org2[0]['id'] == "t2"

def test_rbac_permissions():
    # Test role hierarchy
    assert RBACManager.has_permission("Org Admin", "Engineer") is True
    assert RBACManager.has_permission("Team Lead", "Engineer") is True
    assert RBACManager.has_permission("Engineer", "Team Lead") is False
    assert RBACManager.has_permission("Auditor", "Engineer") is False

def test_rbac_enforcement(storage, vault):
    # Setup context as Auditor (read-only)
    context.set_context("u1", "org1", "Auditor")
    
    pattern = ReasoningPattern(
        failure_description="Test failure",
        failure_embedding=b"emb",
        correction_prompt="Test fix",
        project_id="v1",
        success_rate=1.0
    )
    
    # Auditor should not be able to save a pattern
    with pytest.raises(PermissionError):
        vault.save_pattern("v1", pattern)
        
    # Setup context as Engineer
    context.set_context("u2", "org1", "Engineer")
    
    # Engineer should be able to save a pattern
    storage.create_organization("org1", "Company One")
    storage.create_vault("v1", "org1", "Private Vault")
    
    vault.save_pattern("v1", pattern)
    
    # Verify it was saved
    patterns = storage.query_patterns_by_vault("v1")
    assert len(patterns) == 1
    assert patterns[0]['correction_prompt'] == "Test fix"

def test_vault_hierarchy(storage, vault):
    storage.create_organization("org1", "Company One")
    
    # Create hierarchy: Global -> Dept -> Team -> Private
    storage.create_vault("v_global", "org1", "Global Vault", None)
    storage.create_vault("v_dept", "org1", "Dept Vault", "v_global")
    storage.create_vault("v_team", "org1", "Team Vault", "v_dept")
    storage.create_vault("v_private", "org1", "Private Vault", "v_team")
    
    # Add patterns at different levels
    p_global = ReasoningPattern(failure_description="G", failure_embedding=b"g", correction_prompt="Fix G", project_id="v_global", success_rate=1.0)
    p_team = ReasoningPattern(failure_description="T", failure_embedding=b"t", correction_prompt="Fix T", project_id="v_team", success_rate=1.0)
    p_private = ReasoningPattern(failure_description="P", failure_embedding=b"p", correction_prompt="Fix P", project_id="v_private", success_rate=1.0)
    
    context.set_context("u1", "org1", "Engineer")
    vault.save_pattern("v_global", p_global)
    vault.save_pattern("v_team", p_team)
    vault.save_pattern("v_private", p_private)
    
    # Recommend fix from Private Vault should find all 3
    class MockTrace:
        def __init__(self):
            self.trace_id = "t_test"
            
    recommendations = vault.recommend_fix(MockTrace(), "v_private")
    assert len(recommendations) == 3
    
    # Recommend fix from Team Vault should find 2 (Global and Team)
    recommendations_team = vault.recommend_fix(MockTrace(), "v_team")
    assert len(recommendations_team) == 2
    
    # Recommend fix from Global Vault should find 1
    recommendations_global = vault.recommend_fix(MockTrace(), "v_global")
    assert len(recommendations_global) == 1
