
create or replace function public.dmlapi_notes_r2j(
    fr_data public.notes
)
    returns jsonb
    language plpgsql
    security definer
AS $function$
------------------------------------------------------------------
-- (c) Copyright 2021 Antoniel Lima (antonielliimma@gmail.com)
-- (c) Copyright 2021 desenroladev.com.br
------------------------------------------------------------------
-- public.notes: record to jsonb
------------------------------------------------------------------
declare
    lv_jsonb jsonb;
begin
    lv_jsonb := row_to_json(fr_data,  -- record
                            true);    -- pretty_bool
    return lv_jsonb;
end;
$function$;