
create or replace function public.dmlapi_users_j2r(
    fv_jsonb jsonb
)
    returns public.users
    language plpgsql
    security definer
as $function$
------------------------------------------------------------------
-- (c) Copyright 2021 Antoniel Lima (antonielliimma@gmail.com)
-- (c) Copyright 2021 desenroladev.com.br
------------------------------------------------------------------
-- public.users: jsonb to record
------------------------------------------------------------------
declare
    lv_data             public.users;
begin
    ------------------------------------------------------------
    lv_data.id                                        = fv_jsonb->>'id';                                        --001 uuid not null
    lv_data.username                                  = fv_jsonb->>'username';                                  --002 character varying not null
    lv_data.email                                     = fv_jsonb->>'email';                                     --003 character varying not null
    lv_data.password                                  = fv_jsonb->>'password';                                  --004 character varying
    lv_data.auth_with_google                          = fv_jsonb->>'auth_with_google';                          --005 boolean not null
    lv_data.created_at                                = coalesce((fv_jsonb->>'created_at')::timestamp without time zone, now());                                --006 timestamp without time zone not null
    lv_data.updated_at                                = fv_jsonb->>'updated_at';                                --007 timestamp without time zone
    ------------------------------------------------------------
    return lv_data;
end;
$function$;