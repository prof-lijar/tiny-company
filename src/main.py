import typer
import time
from pathlib import Path
from typing import Optional
from src.parser import LogParser
from src.filter import TraceFilter
from src.engine import NarrativeEngine
from src.telemetry import telemetry

app = typer.Typer()

@app.command()
def parse(
    ctx: typer.Context,
    log_file: Path = typer.Argument(..., help=\"Path to the raw log file\"),
    output: Optional[Path] = typer.Option(None, \"--output\", \"-o\", help=\"Output report file path\"),
    verbosity: str = typer.Option(\"concise\", \"--verbosity\", \"-v\", help=\"Verbosity level: concise or detailed\")
) -> None:
    \"\"\"
    Parse an agent log file and generate a narrative report.
    \"\"\"
    start_time = time.time()
    try:
        # 1. Parse
        parser = LogParser(str(log_file))
        entries = parser.parse()
        
        if not entries:
            typer.echo(\"No valid log entries found in the file.\")
            return

        # 2. Filter
        trace_filter = TraceFilter()
        trace = trace_filter.filter(entries)
        
        if not trace:
            typer.echo(\"No trace data after filtering.\")
            return

        # 3. Synthesize
        engine = NarrativeEngine()
        report = engine.synthesize(trace)
        
        # 4. Output
        if output:
            with open(output, 'w') as f:
                f.write(f\"# Execution Report: {report.trace_id}\\n\\n\")
                f.write(f\"## Summary\\n{report.summary}\\n\\n\")
                f.write(f\"## The Journey\\n\")
                for seg in report.narrative:
                    f.write(f\"- {seg.timestamp}: {seg.text}\\n\")
                f.write(f\"## Tool Usage\\n\")
                for tool in report.tool_usage:
                    f.write(f\"- {tool.tool_name} ({tool.status}): {tool.input} -> {tool.output}\\n\")
                if report.failure_analysis:
                    f.write(f\"## Failure Analysis\\n{report.failure_analysis}\\n\")
                f.write(f\"\\n**Duration:** {report.duration_seconds}s\")
            typer.echo(f\"Report generated at {output}\")
        else:
            # Print to console
            typer.echo(f\"--- Execution Report: {report.trace_id} ---\")
            typer.echo(f\"Summary: {report.summary}\")
            typer.echo(f\"## The Journey\")
            typer.echo(f\"- {seg.timestamp}: {seg.text}\" for seg in report.narrative)
            # Fixed a small bug in the previous version's console output loop
            for tool in report.tool_usage:
                typer.echo(f\"- {tool.tool_name} ({tool.status}): {tool.input} -> {tool.output}\")
            if report.failure_analysis:
                typer.echo(f\"## Failure Analysis: {report.failure_analysis}\")
            typer.echo(f\"Duration: {report.duration_seconds}s\")

    except Exception as e:
        telemetry.error(\"cli_execution_error\", {\"error\": str(e)})
        typer.echo(f\"Error: {str(e)}\", err=True)
    finally:
        telemetry.track_duration(\"total_cli_execution\", start_time)

if __name__ == \"__main__\":
    app()
