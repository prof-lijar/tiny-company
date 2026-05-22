-- Migration: create_study_plan_tables
-- Created: 2026-05-22T03:33:49.902611+00:00

CREATE TABLE IF NOT EXISTS public.study_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE UNIQUE,
  target_exam_date DATE,
  days_remaining INTEGER NOT NULL DEFAULT 0,
  overall_progress REAL NOT NULL DEFAULT 0,
  streak INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.study_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  plan_id UUID NOT NULL REFERENCES public.study_plans(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('vocabulary', 'grammar', 'reading', 'writing', 'listening', 'mock-test')),
  title TEXT NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT false,
  due_date DATE,
  priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('high', 'medium', 'low')),
  target_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_study_plans_user ON public.study_plans(user_id);
CREATE INDEX IF NOT EXISTS idx_study_tasks_plan ON public.study_tasks(plan_id);
