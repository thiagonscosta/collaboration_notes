
create or replace function public.dmlapi_notes_j2r(
    fv_jsonb jsonb
)
    returns public.notes
    language plpgsql
    security definer
as $function$
------------------------------------------------------------------
-- (c) Copyright 2021 Antoniel Lima (antonielliimma@gmail.com)
-- (c) Copyright 2021 desenroladev.com.br
------------------------------------------------------------------
-- public.notes: jsonb to record
------------------------------------------------------------------
declare
    lv_data             public.notes;
begin
    ------------------------------------------------------------
    lv_data.id                                        = fv_jsonb->>'id';                                        --001 uuid not null
    lv_data.content                                   = fv_jsonb->>'content';                                   --002 text not null
    ------------------------------------------------------------
    return lv_data;
end;
$function$;