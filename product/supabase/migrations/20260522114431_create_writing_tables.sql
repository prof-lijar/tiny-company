-- Migration: create_writing_tables
-- Created: 2026-05-22T11:44:31.829669+00:00

CREATE TABLE IF NOT EXISTS public.writing_prompts (
    id TEXT PRIMARY KEY,
    prompt TEXT NOT NULL,
    level INTEGER NOT NULL,
    theme TEXT,
    guidelines TEXT,
    sample_answer TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.writing_samples (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    prompt_id TEXT REFERENCES public.writing_prompts(id),
    user_id UUID,
    content TEXT NOT NULL,
    score INTEGER,
    feedback TEXT,
    level INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.writing_prompts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.writing_samples ENABLE ROW LEVEL SECURITY;

CREATE POLICY "writing_prompts_select_all" ON public.writing_prompts FOR SELECT USING (true);
CREATE POLICY "writing_samples_select_all" ON public.writing_samples FOR SELECT USING (true);
CREATE POLICY "writing_samples_insert_own" ON public.writing_samples FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "writing_samples_select_own" ON public.writing_samples FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "writing_samples_update_own" ON public.writing_samples FOR UPDATE USING (auth.uid() = user_id);

