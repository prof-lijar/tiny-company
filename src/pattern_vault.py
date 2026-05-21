from typing import List, Dict, Any, Optional
from src.models import ProcessedTrace, ReasoningPattern, PruningReport, FragilityReport
from src.storage import TraceStorage

class PatternVault:
    """
    The Pattern Vault implements the 'write-once, fix-everywhere' philosophy.
    It stores proven reasoning corrections and recommends them based on trace similarity.
    """
    def __init__(self, storage: TraceStorage):
        self.storage = storage
        # In a real implementation, we would use a vector DB. 
        # Here we use SQLite for storage and a simple mock for embedding similarity.
        
    def extract_pattern(self, trace: ProcessedTrace, fix: Any) -> ReasoningPattern:
        """
        Extracts a failure-correction pair from a verified fix.
        """
        # Logic to summarize the failure and the fix
        failure_desc = f"Failure in trace {trace.trace_id}: {fix.analysis}"
        
        # Mock embedding: in production, this would be a call to an embedding model
        mock_embedding = b'embedding_vector_for_this_failure' 
        
        pattern = ReasoningPattern(
            failure_description=failure_desc,
            failure_embedding=mock_embedding,
            correction_prompt=fix.suggested_modification,
            project_id="default_project",
            success_rate=1.0
        )
        return pattern

    def save_pattern(self, pattern: ReasoningPattern):
        """
        Persists a reasoning pattern to the vault.
        """
        self.storage.save_pattern(
            failure_embedding=pattern.failure_embedding,
            failure_description=pattern.failure_description,
            correction_prompt=pattern.correction_prompt,
            project_id=pattern.project_id,
            success_rate=pattern.success_rate
        )

    def recommend_fix(self, trace: ProcessedTrace) -> List[ReasoningPattern]:
        """
        Queries the vault for similar historical failures and suggests proven fixes.
        """
        # Mock similarity search: retrieve recent patterns
        patterns_data = self.storage.query_patterns()
        
        # Convert dicts from DB to ReasoningPattern objects
        patterns = []
        for p in patterns_data:
            patterns.append(ReasoningPattern(
                pattern_id=str(p['id']),
                failure_description=p['failure_description'],
                failure_embedding=p['failure_embedding'],
                correction_prompt=p['correction_prompt'],
                project_id=p['project_id'],
                success_rate=p['success_rate'],
                created_at=p['created_at']
            ))
        
        return patterns
