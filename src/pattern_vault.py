from typing import List, Dict, Any, Optional
from src.core.models import ProcessedTrace, ReasoningPattern, PruningReport, FragilityReport
from src.core.storage import TraceStorage
from src.enterprise_core import context, RBACManager
from src.core.telemetry import telemetry
import time

class PatternVault:
    """
    The Pattern Vault implements the 'write-once, fix-everywhere' philosophy.
    Updated for v2.4 to support Hierarchical Vaults and RBAC.
    """
    def __init__(self, storage: TraceStorage):
        self.storage = storage
        
    def extract_pattern(self, trace: ProcessedTrace, fix: Any) -> ReasoningPattern:
        """Extracts a failure-correction pair from a verified fix."""
        start = time.time()
        
        failure_desc = f"Failure in trace {trace.trace_id}: {fix.analysis}"
        mock_embedding = b'embedding_vector_for_this_failure' 
        
        pattern = ReasoningPattern(
            failure_description=failure_desc,
            failure_embedding=mock_embedding,
            correction_prompt=fix.suggested_modification,
            project_id="default_vault", # This is kept for compatibility with models.py
            success_rate=1.0
        )
        
        telemetry.track_duration("pattern_extraction", start, {"trace_id": trace.trace_id})
        return pattern

    def save_pattern(self, vault_id: str, pattern: ReasoningPattern):
        """Persists a reasoning pattern to a specific vault with RBAC check."""
        start = time.time()
        
        # RBAC Check: Only Org Admin, Team Lead, and Engineer can save patterns
        # Auditor is read-only.
        RBACManager.verify_access(context.current_role, 'Engineer')
        
        self.storage.save_pattern(
            vault_id=vault_id,
            failure_embedding=pattern.failure_embedding,
            failure_description=pattern.failure_description,
            correction_prompt=pattern.correction_prompt,
            success_rate=pattern.success_rate
        )
        
        telemetry.track_duration("pattern_save", start, {"vault_id": vault_id})

    def recommend_fix(self, trace: ProcessedTrace, vault_id: str) -> List[ReasoningPattern]:
        """
        Queries the vault hierarchy for similar historical failures.
        Searches from the current vault up to the Global-Org-Vault.
        """
        start = time.time()
        
        # Get the hierarchy path: [Global, Dept, Team, Private]
        hierarchy = self.storage.get_vault_hierarchy(vault_id)
        
        all_patterns = []
        for v_id in hierarchy:
            patterns_data = self.storage.query_patterns_by_vault(v_id)
            for p in patterns_data:
                all_patterns.append(ReasoningPattern(
                    pattern_id=str(p['id']),
                    failure_description=p['failure_description'],
                    failure_embedding=p['failure_embedding'],
                    correction_prompt=p['correction_prompt'],
                    project_id=v_id,
                    success_rate=p['success_rate'],
                    created_at=p['created_at']
                ))
        
        telemetry.track_duration("pattern_recommendation", start, {
            "trace_id": trace.trace_id, 
            "vault_id": vault_id, 
            "patterns_found": len(all_patterns)
        })
        return all_patterns
