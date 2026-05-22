-- Migration: update_writing_prompts_schema
-- Created: 2026-05-22T12:12:07.781466+00:00

ALTER TABLE public.writing_prompts 
ADD COLUMN IF NOT EXISTS task_number INTEGER,
ADD COLUMN IF NOT EXISTS title TEXT,
ADD COLUMN IF NOT EXISTS instruction TEXT,
ADD COLUMN IF NOT EXISTS context TEXT,
ADD COLUMN IF NOT EXISTS scoring_criteria TEXT,
ADD COLUMN IF NOT EXISTS tags TEXT[];
