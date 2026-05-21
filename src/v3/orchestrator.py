import uuid
from typing import List, Dict, Any, Optional
from litellm import completion
from src.reasoning_block_registry import ReasoningBlockRegistry
from src.core.storage import TraceStorage

class Orchestrator:
    '''
    The Dynamic Orchestrator (CM-2) resolves and executes chains of reasoning blocks.
    It ensures runtime swapping of block versions and generates v3-compliant traces.
    '''
    def __init__(self, registry: ReasoningBlockRegistry, storage: TraceStorage):
        self.registry = registry
        self.storage = storage

    def execute_chain(self, cognitive_architecture: List[str], initial_input: str, org_id: str) -> str:
        '''
        Executes a sequence of reasoning blocks defined by their IDs.
        
        Args:
            cognitive_architecture: A list of ReasoningBlock IDs to execute in order.
            initial_input: The starting input to the first block.
            org_id: The organization ID for trace isolation.
            
        Returns:
            The final output of the execution chain.
        '''
        trace_id = str(uuid.uuid4())
        self.storage.save_trace(
            trace_id=trace_id,
            org_id=org_id,
            agent_id="v3-dynamic-orchestrator",
            session_id=str(uuid.uuid4()),
            metadata={
                "architecture": cognitive_architecture, 
                "initial_input": initial_input,
                "orchestrator_version": "1.0"
            },
            status="running"
        )

        current_context = initial_input
        
        for index, block_id in enumerate(cognitive_architecture):
            # 1. Block Resolution (Requirement 1 & 3)
            # Resolves the latest stable version from the Registry.
            # This automatically handles runtime swapping as the Registry reads from storage.
            version = self.registry.get_latest_stable(block_id)
            if not version:
                error_msg = f"Block {block_id} not found or no stable version available"
                self.storage.append_log(
                    trace_id=trace_id,
                    message=error_msg,
                    level="ERROR",
                    step_index=index
                )
                self.storage.update_trace_end(trace_id, status="failed")
                raise ValueError(error_msg)

            # 2. Execution Chain (Requirement 2)
            # We assume the block content (the prompt) uses {context} as a placeholder for input.
            prompt = version.content.replace("{context}", current_context)
            
            try:
                # Execute using the model specified in the block version
                response = completion(
                    model=version.target_model,
                    messages=[{"role": "user", "content": prompt}]
                )
                output = response.choices[0].message.content
                
                # 3. Trace Integration (Requirement 4)
                # Recording block_id, model_id, and status for every milestone.
                self.storage.append_log(
                    trace_id=trace_id,
                    message=f"Executed block {block_id} (v{version.version_number})",
                    level="INFO",
                    raw_payload={
                        "block_id": block_id,
                        "model_id": version.target_model,
                        "status": "success",
                        "version": version.version_number,
                        "input_length": len(current_context),
                        "output_length": len(output)
                    },
                    step_index=index
                )
                
                current_context = output
                
            except Exception as e:
                self.storage.append_log(
                    trace_id=trace_id,
                    message=f"Error executing block {block_id}: {str(e)}",
                    level="ERROR",
                    raw_payload={
                        "block_id": block_id,
                        "model_id": version.target_model,
                        "status": "failed",
                        "error": str(e)
                    },
                    step_index=index
                )
                self.storage.update_trace_end(trace_id, status="failed")
                raise e

        self.storage.update_trace_end(trace_id, status="completed")
        return current_context
