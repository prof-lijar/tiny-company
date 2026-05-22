"""Tiny Company agent definitions."""
from __future__ import annotations

import os

os.environ["OPENAI_API_KEY"] = "ollama"
os.environ["OPENAI_BASE_URL"] = "http://localhost:11434/v1"

import google.auth  # noqa: E402
from google.adk.agents import Agent  # noqa: E402
from google.adk.models import LiteLlm  # noqa: E402

from config import Config  # noqa: E402

_, project_id = google.auth.default()
os.environ["GOOGLE_CLOUD_PROJECT"] = project_id
os.environ["GOOGLE_CLOUD_LOCATION"] = "global"
os.environ["GOOGLE_GENAI_USE_VERTEXAI"] = "True"

_config = Config.from_env()


def _make_model() -> LiteLlm:
    return LiteLlm(
        model=f"openai/{_config.model_name}",
        api_base=_config.ollama_base_url,
        api_key=_config.ollama_api_key,
        think=True,
        num_ctx=_config.num_ctx,
        repeat_penalty=1.2,
        temperature=_config.temperature,
    )


_model = _make_model()

# --- Tool imports ---
from app.tools.github import (  # noqa: E402
    close_issue,
    comment_on_issue,
    create_issue,
    create_pull_request,
    list_closed_issues,
    list_issue_comments,
    list_open_issues,
    list_pull_requests,
    merge_pull_request,
    review_pull_request,
    view_issue,
    view_pull_request,
)
from app.tools.git import (  # noqa: E402
    git_abort_merge,
    git_check_unmerged_branches,
    git_cleanup_branches,
    git_cleanup_remote_branches,
    git_commit_and_push,
    git_create_branch,
    git_current_branch,
    git_delete_branch,
    git_list_branches,
    git_log,
    git_merge_branch,
    git_pull,
    git_resolve_conflict,
    git_show_conflicts,
    git_switch_branch,
    run_command,
)
from app.tools.files import (  # noqa: E402
    append_to_file,
    delete_file,
    list_directory,
    read_file,
    search_files,
    write_file,
)
from app.tools.repo_state import get_company_status  # noqa: E402
from app.tools.web import (  # noqa: E402
    web_read,
    web_search,
    web_search_and_read,
    search_skills,
    read_skill,
)
from app.tools.dev import (  # noqa: E402
    npm_build,
    npm_test,
    type_check,
    lint_code,
    git_diff,
    git_show_commit,
    check_page_exists,
    list_routes,
    start_dev_server,
    stop_dev_server,
    fetch_page,
    review_component,
)
from app.tools.supabase import (  # noqa: E402
    supabase_query,
    supabase_list_tables,
    supabase_run_migration,
    supabase_manage_rls,
    supabase_grant_access,
)

# --- Prompt imports ---
from app.prompts.ceo import CEO_INSTRUCTION  # noqa: E402
from app.prompts.cto import CTO_INSTRUCTION  # noqa: E402
from app.prompts.designer import DESIGNER_INSTRUCTION  # noqa: E402
from app.prompts.finance import FINANCE_INSTRUCTION  # noqa: E402
from app.prompts.legal import LEGAL_INSTRUCTION  # noqa: E402
from app.prompts.marketing import MARKETING_INSTRUCTION  # noqa: E402
from app.prompts.product import PRODUCT_INSTRUCTION  # noqa: E402
from app.prompts.qa import QA_INSTRUCTION  # noqa: E402

# === SHARED TOOLS (all agents get these) ===
_shared_tools = [
    list_open_issues, view_issue, list_issue_comments,
    list_pull_requests, view_pull_request,
    read_file, list_directory, search_files, get_company_status,
    git_log, git_current_branch,
    comment_on_issue, close_issue,
    web_search, web_read, web_search_and_read,
    search_skills, read_skill,
]

# === CEO AGENT ===
ceo_agent = Agent(
    name="ceo_agent",
    model=_model,
    instruction=CEO_INSTRUCTION,
    tools=[
        *_shared_tools,
        create_issue, list_closed_issues,
        write_file,
    ],
)

# === PRODUCT AGENT ===
product_agent = Agent(
    name="product_agent",
    model=_model,
    instruction=PRODUCT_INSTRUCTION,
    tools=[
        *_shared_tools,
        create_issue,
        write_file, append_to_file, delete_file,
        git_commit_and_push,
    ],
)

# === CTO AGENT ===
cto_agent = Agent(
    name="cto_agent",
    model=_model,
    instruction=CTO_INSTRUCTION,
    tools=[
        *_shared_tools,
        create_issue,
        write_file, append_to_file, delete_file,
        git_create_branch, git_switch_branch, git_delete_branch,
        git_list_branches, git_check_unmerged_branches,
        git_cleanup_branches, git_cleanup_remote_branches,
        git_commit_and_push, git_pull,
        git_merge_branch, git_show_conflicts, git_resolve_conflict, git_abort_merge,
        create_pull_request, review_pull_request, merge_pull_request,
        run_command,
        npm_build, npm_test, type_check, lint_code,
        supabase_query, supabase_list_tables, supabase_run_migration, supabase_manage_rls, supabase_grant_access,
    ],
)

# === DESIGNER AGENT ===
designer_agent = Agent(
    name="designer_agent",
    model=_model,
    instruction=DESIGNER_INSTRUCTION,
    tools=[
        *_shared_tools,
        write_file, append_to_file, delete_file,
        git_create_branch, git_switch_branch, git_delete_branch,
        git_cleanup_branches, git_cleanup_remote_branches,
        git_commit_and_push, git_pull,
        create_pull_request, merge_pull_request,
    ],
)

# === MARKETING AGENT ===
marketing_agent = Agent(
    name="marketing_agent",
    model=_model,
    instruction=MARKETING_INSTRUCTION,
    tools=[
        *_shared_tools,
        create_issue,
        write_file, append_to_file, delete_file,
        git_commit_and_push,
    ],
)

# === LEGAL AGENT ===
legal_agent = Agent(
    name="legal_agent",
    model=_model,
    instruction=LEGAL_INSTRUCTION,
    tools=[
        *_shared_tools,
        write_file, append_to_file, delete_file,
        git_create_branch, git_switch_branch, git_delete_branch,
        git_cleanup_branches, git_cleanup_remote_branches,
        git_commit_and_push, git_pull,
        create_pull_request, merge_pull_request,
    ],
)

# === FINANCE AGENT ===
finance_agent = Agent(
    name="finance_agent",
    model=_model,
    instruction=FINANCE_INSTRUCTION,
    tools=[
        *_shared_tools,
        create_issue,
        write_file, append_to_file, delete_file,
        git_commit_and_push,
    ],
)

# === QA AGENT ===
qa_agent = Agent(
    name="qa_agent",
    model=_model,
    instruction=QA_INSTRUCTION,
    tools=[
        *_shared_tools,
        create_issue,
        read_file, list_directory, search_files,
        npm_build, npm_test, type_check, lint_code,
        git_diff, git_show_commit, check_page_exists, list_routes,
        start_dev_server, stop_dev_server, fetch_page, review_component,
        run_command,
        supabase_query, supabase_list_tables,
    ],
)

AGENTS = {
    "ceo": ceo_agent,
    "product": product_agent,
    "cto": cto_agent,
    "designer": designer_agent,
    "marketing": marketing_agent,
    "legal": legal_agent,
    "finance": finance_agent,
    "qa": qa_agent,
}
