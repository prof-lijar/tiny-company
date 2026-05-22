-- Migration: add_indexes_for_performance_v2
-- Created: 2026-05-22T05:48:54.800616+00:00

CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_vocabulary_progress_user_id ON public.vocabulary_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_study_plans_user_id ON public.study_plans(user_id);
CREATE INDEX IF NOT EXISTS idx_study_tasks_plan_id ON public.study_tasks(plan_id);

