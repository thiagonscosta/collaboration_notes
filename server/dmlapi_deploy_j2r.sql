
create or replace function public.dmlapi_deploy_j2r(
    fv_jsonb jsonb
)
    returns public.deploy
    language plpgsql
    security definer
as $function$
------------------------------------------------------------------
-- (c) Copyright 2021 Antoniel Lima (antonielliimma@gmail.com)
-- (c) Copyright 2021 desenroladev.com.br
------------------------------------------------------------------
-- public.deploy: jsonb to record
------------------------------------------------------------------
declare
    lv_data             public.deploy;
begin
    ------------------------------------------------------------
    
    ------------------------------------------------------------
    return lv_data;
end;
$function$;