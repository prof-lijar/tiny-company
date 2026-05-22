"""Supabase database tools for Tiny Company agents.

Provides direct PostgreSQL access to the Supabase database via psycopg2.
Agents use these tools to create tables, run migrations, manage RLS policies,
and query data — full backend developer access.
"""
from __future__ import annotations

import hashlib
import json
import os
from datetime import datetime, timezone
from pathlib import Path

import psycopg2
import psycopg2.extras

from config import Config

_config = Config.from_env()
_MIGRATIONS_DIR = _config.repo_dir / "product" / "supabase" / "migrations"
_migrations_table_ready = False


def _get_connection():
    db_url = os.environ.get("SUPABASE_DB_URL", "")
    if not db_url:
        raise RuntimeError(
            "SUPABASE_DB_URL not set. Copy .env.dev to .env and add your "
            "Supabase PostgreSQL connection string."
        )
    return psycopg2.connect(db_url, connect_timeout=10)


def _truncate(text: str, limit: int = 8000) -> str:
    if len(text) > limit:
        return text[:limit] + "\n... (truncated)"
    return text


def _ensure_migrations_table():
    global _migrations_table_ready
    if _migrations_table_ready:
        return
    conn = _get_connection()
    conn.autocommit = True
    try:
        with conn.cursor() as cur:
            cur.execute("""
                CREATE TABLE IF NOT EXISTS public.schema_migrations (
                    id SERIAL PRIMARY KEY,
                    name TEXT NOT NULL UNIQUE,
                    applied_at TIMESTAMPTZ DEFAULT now(),
                    checksum TEXT
                );
            """)
            if _MIGRATIONS_DIR.exists():
                for f in sorted(_MIGRATIONS_DIR.glob("*.sql")):
                    parts = f.stem.split("_", 1)
                    if len(parts) == 2:
                        migration_name = parts[1]
                    else:
                        migration_name = f.stem
                    cur.execute(
                        "INSERT INTO public.schema_migrations (name, checksum) "
                        "VALUES (%s, %s) ON CONFLICT (name) DO NOTHING",
                        (migration_name, hashlib.md5(f.read_bytes()).hexdigest()),
                    )
        _migrations_table_ready = True
    finally:
        conn.close()


def supabase_query(sql: str) -> str:
    """Execute a SQL query against the Supabase PostgreSQL database.

    Use this for ANY database operation: CREATE TABLE, ALTER TABLE, INSERT,
    SELECT, UPDATE, DELETE, CREATE POLICY, etc. You have full admin access.

    For DDL (CREATE/ALTER/DROP), the result confirms success.
    For SELECT queries, the result includes the returned rows.
    For INSERT/UPDATE/DELETE, the result includes the affected row count.

    Args:
        sql: The SQL statement to execute. Can be any valid PostgreSQL SQL.

    Returns:
        JSON string with query results or confirmation.
    """
    try:
        conn = _get_connection()
        conn.autocommit = True
        try:
            with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cur:
                cur.execute(sql)

                if cur.description:
                    rows = cur.fetchall()
                    rows_serializable = [
                        {k: _serialize_value(v) for k, v in row.items()}
                        for row in rows
                    ]
                    return json.dumps({
                        "success": True,
                        "rows": rows_serializable[:500],
                        "row_count": len(rows),
                        "columns": [desc[0] for desc in cur.description],
                        "truncated": len(rows) > 500,
                    })
                else:
                    return json.dumps({
                        "success": True,
                        "message": f"Query executed successfully. Rows affected: {cur.rowcount}",
                        "rows_affected": cur.rowcount,
                    })
        finally:
            conn.close()
    except psycopg2.Error as e:
        return json.dumps({
            "success": False,
            "error": _truncate(str(e), 2000),
            "hint": getattr(e, "pgerror", "") or "",
        })
    except Exception as e:
        return json.dumps({"success": False, "error": str(e)})


def supabase_list_tables() -> str:
    """List all tables in the public schema with their columns, types, and constraints.

    Call this to understand the current database schema before writing code
    or creating new tables. Returns table names, column definitions, primary keys,
    and foreign keys.

    Returns:
        JSON string with the full schema of all public tables.
    """
    sql = """
    SELECT
        t.table_name,
        json_agg(
            json_build_object(
                'column', c.column_name,
                'type', c.data_type,
                'nullable', c.is_nullable,
                'default', c.column_default,
                'max_length', c.character_maximum_length
            ) ORDER BY c.ordinal_position
        ) AS columns
    FROM information_schema.tables t
    JOIN information_schema.columns c
        ON t.table_name = c.table_name AND t.table_schema = c.table_schema
    WHERE t.table_schema = 'public'
        AND t.table_type = 'BASE TABLE'
    GROUP BY t.table_name
    ORDER BY t.table_name;
    """

    rls_sql = """
    SELECT
        schemaname,
        tablename,
        policyname,
        permissive,
        roles,
        cmd,
        qual,
        with_check
    FROM pg_policies
    WHERE schemaname = 'public';
    """

    try:
        conn = _get_connection()
        conn.autocommit = True
        try:
            tables = []
            with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cur:
                cur.execute(sql)
                for row in cur.fetchall():
                    tables.append({
                        "table": row["table_name"],
                        "columns": row["columns"],
                    })

                policies = []
                cur.execute(rls_sql)
                for row in cur.fetchall():
                    policies.append({
                        "table": row["tablename"],
                        "policy": row["policyname"],
                        "command": row["cmd"],
                        "roles": row["roles"],
                    })

            return json.dumps({
                "success": True,
                "tables": tables,
                "table_count": len(tables),
                "rls_policies": policies,
            })
        finally:
            conn.close()
    except psycopg2.Error as e:
        return json.dumps({"success": False, "error": _truncate(str(e), 2000)})
    except Exception as e:
        return json.dumps({"success": False, "error": str(e)})


def supabase_run_migration(name: str, sql: str) -> str:
    """Execute SQL and save it as a versioned migration file.

    Use this instead of raw supabase_query when creating or altering tables.
    The SQL is executed against the database AND saved to
    product/supabase/migrations/{timestamp}_{name}.sql for version control.

    Migrations are tracked in a schema_migrations table. If a migration with the
    same name was already applied, it will be skipped automatically.

    Args:
        name: Short descriptive name for the migration (e.g., 'create_users_table',
              'add_score_column_to_results'). Use snake_case, no spaces.
        sql: The SQL to execute. Should be idempotent when possible
             (use IF NOT EXISTS, etc.).

    Returns:
        JSON string with execution result and migration file path.
    """
    name = name.strip().replace(" ", "_").replace("-", "_").lower()
    if not name:
        return json.dumps({"success": False, "error": "Migration name is required"})

    try:
        _ensure_migrations_table()
    except Exception as e:
        return json.dumps({"success": False, "error": f"Failed to init migration tracking: {e}"})

    try:
        conn = _get_connection()
        conn.autocommit = True
        try:
            with conn.cursor() as cur:
                cur.execute(
                    "SELECT id FROM public.schema_migrations WHERE name = %s",
                    (name,),
                )
                if cur.fetchone():
                    return json.dumps({
                        "success": True,
                        "skipped": True,
                        "reason": f"Migration '{name}' already applied — skipping",
                    })
        finally:
            conn.close()
    except Exception:
        pass

    checksum = hashlib.md5(sql.encode()).hexdigest()

    query_result = json.loads(supabase_query(sql))
    if not query_result.get("success"):
        return json.dumps({
            "success": False,
            "error": f"Migration SQL failed: {query_result.get('error', 'unknown')}",
            "hint": query_result.get("hint", ""),
        })

    try:
        conn = _get_connection()
        conn.autocommit = True
        try:
            with conn.cursor() as cur:
                cur.execute(
                    "INSERT INTO public.schema_migrations (name, checksum) "
                    "VALUES (%s, %s) ON CONFLICT (name) DO NOTHING",
                    (name, checksum),
                )
        finally:
            conn.close()
    except Exception:
        pass

    _MIGRATIONS_DIR.mkdir(parents=True, exist_ok=True)
    timestamp = datetime.now(timezone.utc).strftime("%Y%m%d%H%M%S")
    filename = f"{timestamp}_{name}.sql"
    migration_path = _MIGRATIONS_DIR / filename

    try:
        migration_path.write_text(
            f"-- Migration: {name}\n"
            f"-- Created: {datetime.now(timezone.utc).isoformat()}\n\n"
            f"{sql}\n",
            encoding="utf-8",
        )
    except Exception as e:
        return json.dumps({
            "success": True,
            "message": "SQL executed but migration file could not be saved",
            "file_error": str(e),
            "query_result": query_result,
        })

    return json.dumps({
        "success": True,
        "message": f"Migration executed and saved to {filename}",
        "migration_file": str(migration_path.relative_to(_config.repo_dir)),
        "query_result": query_result,
    })


def supabase_manage_rls(table: str, policy_name: str, policy_sql: str) -> str:
    """Enable Row Level Security on a table and create a policy.

    This is a convenience wrapper that:
    1. Enables RLS on the table (ALTER TABLE ... ENABLE ROW LEVEL SECURITY)
    2. Creates the policy you specify

    Args:
        table: The table name (e.g., 'users', 'vocabulary_progress').
        policy_name: Name for the policy (e.g., 'users_select_own',
                     'authenticated_insert').
        policy_sql: The full CREATE POLICY statement. Example:
                    'CREATE POLICY "users_select_own" ON public.users
                     FOR SELECT USING (auth.uid() = id);'

    Returns:
        JSON string with results of both the RLS enable and policy creation.
    """
    table = table.strip()
    if not table:
        return json.dumps({"success": False, "error": "Table name is required"})
    if not policy_sql.strip():
        return json.dumps({"success": False, "error": "Policy SQL is required"})

    enable_rls_sql = f'ALTER TABLE public."{table}" ENABLE ROW LEVEL SECURITY;'
    rls_result = json.loads(supabase_query(enable_rls_sql))

    policy_result = json.loads(supabase_query(policy_sql))

    overall_success = policy_result.get("success", False)

    return json.dumps({
        "success": overall_success,
        "rls_enabled": rls_result.get("success", False),
        "rls_message": rls_result.get("message", rls_result.get("error", "")),
        "policy_created": policy_result.get("success", False),
        "policy_message": policy_result.get("message", policy_result.get("error", "")),
        "table": table,
        "policy_name": policy_name,
    })


def supabase_grant_access(table: str) -> str:
    """Grant SELECT, INSERT, UPDATE, DELETE on a public table to anon and authenticated roles.

    The Supabase Data API (used by the Next.js client via supabase-js) requires
    explicit GRANT permissions on tables. Without this, even correct RLS policies
    will result in permission-denied errors from the client.

    Call this AFTER creating a table and setting up RLS policies.

    Args:
        table: The table name in the public schema (e.g., 'users', 'vocabulary_progress').

    Returns:
        JSON string confirming the grants were applied.
    """
    table = table.strip()
    if not table:
        return json.dumps({"success": False, "error": "Table name is required"})

    grant_sql = (
        f'GRANT SELECT, INSERT, UPDATE, DELETE ON public."{table}" TO anon, authenticated;'
    )
    result = json.loads(supabase_query(grant_sql))

    if result.get("success"):
        return json.dumps({
            "success": True,
            "message": f"Granted SELECT, INSERT, UPDATE, DELETE on public.{table} to anon, authenticated",
            "table": table,
        })
    return json.dumps({
        "success": False,
        "error": f"GRANT failed: {result.get('error', 'unknown')}",
        "hint": result.get("hint", ""),
        "table": table,
    })


def supabase_migration_status() -> str:
    """Show which migrations have been applied and which .sql files exist on disk.

    Returns a list of all tracked migrations (from the schema_migrations table)
    and flags any .sql files on disk that are not yet tracked.

    Returns:
        JSON string with applied migrations and any untracked files.
    """
    try:
        _ensure_migrations_table()
    except Exception as e:
        return json.dumps({"success": False, "error": f"Failed to init migration tracking: {e}"})

    applied: list[dict] = []
    try:
        conn = _get_connection()
        conn.autocommit = True
        try:
            with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cur:
                cur.execute(
                    "SELECT name, applied_at, checksum FROM public.schema_migrations "
                    "ORDER BY applied_at"
                )
                for row in cur.fetchall():
                    applied.append({
                        "name": row["name"],
                        "applied_at": str(row["applied_at"]),
                        "checksum": row["checksum"],
                    })
        finally:
            conn.close()
    except Exception as e:
        return json.dumps({"success": False, "error": str(e)})

    applied_names = {m["name"] for m in applied}

    on_disk: list[str] = []
    untracked: list[str] = []
    if _MIGRATIONS_DIR.exists():
        for f in sorted(_MIGRATIONS_DIR.glob("*.sql")):
            parts = f.stem.split("_", 1)
            migration_name = parts[1] if len(parts) == 2 else f.stem
            on_disk.append(f.name)
            if migration_name not in applied_names:
                untracked.append(f.name)

    return json.dumps({
        "success": True,
        "applied": applied,
        "applied_count": len(applied),
        "files_on_disk": on_disk,
        "untracked_files": untracked,
    })


def _serialize_value(val):
    """Convert non-JSON-serializable values to strings."""
    if val is None:
        return None
    if isinstance(val, (str, int, float, bool)):
        return val
    if isinstance(val, (list, dict)):
        return val
    return str(val)
