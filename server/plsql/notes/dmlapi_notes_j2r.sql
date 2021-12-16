
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
    lv_data.title                                     = fv_jsonb->>'title';                                     --002 character varying not null
    lv_data.content                                   = fv_jsonb->>'content';                                   --003 character varying
    lv_data.created_at                                = coalesce((fv_jsonb->>'created_at')::timestamp without time zone, now());                                --004 timestamp without time zone not null
    lv_data.updated_at                                = fv_jsonb->>'updated_at';                                --005 timestamp without time zone
    ------------------------------------------------------------
    return lv_data;
end;
$function$;