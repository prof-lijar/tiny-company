-- Migration: revoke_anon_write_access_content_tables
-- Created: 2026-05-23T15:14:28.460668+00:00

REVOKE INSERT, UPDATE, DELETE ON TABLE public.vocabulary FROM anon;
REVOKE INSERT, UPDATE, DELETE ON TABLE public.grammar_lessons FROM anon;
REVOKE INSERT, UPDATE, DELETE ON TABLE public.reading_passages FROM anon;
REVOKE INSERT, UPDATE, DELETE ON TABLE public.listening_passages FROM anon;
