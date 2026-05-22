-- Migration: create_model_essays_table
-- Created: 2026-05-22T06:14:49.457326+00:00

CREATE TABLE IF NOT EXISTS public.model_essays (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    title text NOT NULL,
    prompt text NOT NULL,
    content text NOT NULL,
    theme text NOT NULL,
    level integer DEFAULT 6,
    created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.model_essays ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read model essays
CREATE POLICY "model_essays_select_all" ON public.model_essays
    FOR SELECT USING (true);

