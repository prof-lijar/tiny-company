-- Migration: enable_rls_and_fix_study_tasks_policy
-- Created: 2026-05-22T04:57:43.744925+00:00

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vocabulary_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_tasks ENABLE ROW LEVEL SECURITY;

-- Fix the broken study_tasks_delete_own policy
DROP POLICY IF EXISTS "study_tasks_delete_own" ON public.study_tasks;

CREATE POLICY "study_tasks_delete_own"
  ON public.study_tasks
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1
      FROM public.study_plans
      WHERE public.study_plans.id = public.study_tasks.plan_id
        AND public.study_plans.user_id = auth.uid()
    )
  );

