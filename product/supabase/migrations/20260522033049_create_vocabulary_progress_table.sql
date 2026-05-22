-- Migration: create_vocabulary_progress_table
-- Created: 2026-05-22T03:30:49.005820+00:00

CREATE TABLE IF NOT EXISTS public.vocabulary_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  word_id TEXT NOT NULL,
  interval REAL NOT NULL DEFAULT 1,
  ease_factor REAL NOT NULL DEFAULT 2.5,
  next_review TIMESTAMPTZ NOT NULL DEFAULT now(),
  review_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, word_id)
);

CREATE INDEX IF NOT EXISTS idx_vocab_progress_user ON public.vocabulary_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_vocab_progress_next_review ON public.vocabulary_progress(user_id, next_review);
