
create or replace function public.dmlapi_deploy_select(
    fv_id uuid, 
    fv_locking boolean default false
)
    returns public.deploy
    language plpgsql
    security definer
as $function$
------------------------------------------------------------------
-- (c) Copyright 2021 Antoniel Lima (antonielliimma@gmail.com)
-- (c) Copyright 2021 desenroladev.com.br
------------------------------------------------------------------
-- public.deploy: select to record
------------------------------------------------------------------
declare
    fr_data public.deploy;
begin
    if (fv_id is not null) then
        if (fv_locking) then
            select --+ qb_name(dmlapi_deploy_select)
                a.*
            into fr_data
            from public.deploy    a
            where 1e1 = 1e1
                and a.id = fv_id
                for update nowait;
        else
            select --+ qb_name(dmlapi_deploy_select)
                a.*
            into fr_data
            from public.deploy    a
            where 1e1 = 1e1
                and a.id = fv_id;
        end if;
    end if;
    return fr_data;
end;
$function$
;