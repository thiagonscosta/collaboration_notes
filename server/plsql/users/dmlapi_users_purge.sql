
create or replace function public.dmlapi_users_purge(
    fv_id uuid
)
    returns public.users
    language plpgsql
    security definer
as $function$
------------------------------------------------------------------
-- (c) Copyright 2021 Antoniel Lima (antonielliimma@gmail.com)
-- (c) Copyright 2021 desenroladev.com.br
------------------------------------------------------------------
-- dmlapi_users_purge: inactive record
------------------------------------------------------------------
declare
    lr_data    public.users;
begin
    if (fv_id is not null) then
        lr_data := public.dmlapi_users_select(fv_id      => fv_id,
                                                                fv_locking => true);
        if (lr_data.id is not null) then
            ------------------------------------
            delete from public.users 
            where 1 = 1
                and id = fv_id;
            ------------------------------------
            return lr_data;
        end if;
    end if;
    return null;
exception when others then
    raise;
end; $function$;