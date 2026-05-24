-- Migration: add_expert_tips_to_writing_samples
-- Created: 2026-05-24T13:03:39.477842+00:00

ALTER TABLE public.writing_samples ADD COLUMN IF NOT EXISTS expert_tips jsonb;
