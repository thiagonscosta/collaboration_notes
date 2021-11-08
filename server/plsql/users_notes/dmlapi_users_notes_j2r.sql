
create or replace function public.dmlapi_users_notes_j2r(
    fv_jsonb jsonb
)
    returns public.users_notes
    language plpgsql
    security definer
as $function$
------------------------------------------------------------------
-- (c) Copyright 2021 Antoniel Lima (antonielliimma@gmail.com)
-- (c) Copyright 2021 desenroladev.com.br
------------------------------------------------------------------
-- public.users_notes: jsonb to record
------------------------------------------------------------------
declare
    lv_data             public.users_notes;
begin
    ------------------------------------------------------------
    lv_data.user_id                                   = fv_jsonb->>'user_id';                                   --001 uuid
    lv_data.note_id                                   = fv_jsonb->>'note_id';                                   --002 uuid
    ------------------------------------------------------------
    return lv_data;
end;
$function$;