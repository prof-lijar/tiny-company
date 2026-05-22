-- Migration: add_study_plan_progress_trigger
-- Created: 2026-05-22T05:41:22.960144+00:00

CREATE OR REPLACE FUNCTION public.update_study_plan_progress()
RETURNS TRIGGER AS $$
DECLARE
    plan_id_var UUID;
    new_progress REAL;
BEGIN
    IF (TG_OP = 'DELETE') THEN
        plan_id_var := OLD.plan_id;
    ELSE
        plan_id_var := NEW.plan_id;
    END IF;

    SELECT (COUNT(*) FILTER (WHERE completed = true) * 100.0 / NULLIF(COUNT(*), 0))
    INTO new_progress
    FROM public.study_tasks
    WHERE plan_id = plan_id_var;

    UPDATE public.study_plans
    SET overall_progress = COALESCE(new_progress, 0),
        updated_at = now()
    WHERE id = plan_id_var;

    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS tr_update_study_plan_progress ON public.study_tasks;
CREATE TRIGGER tr_update_study_plan_progress
AFTER INSERT OR UPDATE OF completed OR DELETE ON public.study_tasks
FOR EACH ROW
EXECUTE FUNCTION public.update_study_plan_progress();

