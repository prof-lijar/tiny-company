-- Migration: create_generate_daily_tasks_rpc
-- Created: 2026-05-22T05:44:26.674142+00:00

CREATE OR REPLACE FUNCTION public.generate_daily_tasks(
    p_plan_id UUID,
    p_tasks JSONB
)
RETURNS VOID AS $$
BEGIN
    -- Delete today's tasks
    DELETE FROM public.study_tasks
    WHERE plan_id = p_plan_id
      AND due_date = (CURRENT_DATE)::date;

    -- Insert new tasks
    INSERT INTO public.study_tasks (
        plan_id,
        type,
        title,
        completed,
        due_date,
        priority,
        target_url
    )
    SELECT 
        p_plan_id,
        (t->>'type'),
        (t->>'title'),
        (t->>'completed')::boolean,
        (t->>'due_date')::date,
        (t->>'priority'),
        (t->>'target_url')
    FROM jsonb_array_elements(p_tasks) AS t;
END;
$$ LANGUAGE plpgsql;

-- Grant access to the function
GRANT EXECUTE ON FUNCTION public.generate_daily_tasks(UUID, JSONB) TO authenticated;
GRANT EXECUTE ON FUNCTION public.generate_daily_tasks(UUID, JSONB) TO anon;

