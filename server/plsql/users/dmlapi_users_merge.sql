
create or replace function public.dmlapi_users_merge(
    fr_data public.users,
    fv_old_id uuid default null
) 
    returns public.users
    language plpgsql
    security definer
as $function$
------------------------------------------------------------------
-- (c) Copyright 2021 Antoniel Lima (antonielliimma@gmail.com)
-- (c) Copyright 2021 desenroladev.com.br
------------------------------------------------------------------
-- dmlapi_users_merge: insert or update
------------------------------------------------------------------
declare
    lr_data    public.users;
begin
    -------------------------------------------------------------------------------------
    -- UPDATE FROM PK WITH OLD ID
    -------------------------------------------------------------------------------------
    if fv_old_id is null then
        fv_old_id := fr_data.id;
    end if;
    -------------------------------------------------------------------------------------
    if (fr_data.id is not null) then
    lr_data := public.dmlapi_users_select(fv_id      => fv_old_id,
                                                                fv_locking => true);
    if (lr_data.id is not null) then
        update --+ qb_name(dmlapi_users_merge)
                public.users
            set 
            id                                        = fr_data.id,                                        --001 uuid
            username                                  = fr_data.username,                                  --002 character varying not null
            email                                     = fr_data.email,                                     --003 character varying
            password                                  = fr_data.password,                                  --004 character varying not null
            auth_whith_google                         = fr_data.auth_whith_google                          --006 boolean not null
        where 1e1 = 1e1
            and id = fv_old_id
        returning * into fr_data;
    else
        insert --+ qb_name(dmlapi_users_merge)
        into public.users
            (
                id,                                        --001 uuid
              username,                                  --002 character varying not null
              email,                                     --003 character varying
              password,                                  --004 character varying not null
              auth_whith_google                          --006 boolean not null
            )
        values(
                fr_data.id,                                        --001 uuid
              fr_data.username,                                  --002 character varying not null
              fr_data.email,                                     --003 character varying
              fr_data.password,                                  --004 character varying not null
              fr_data.auth_whith_google                          --006 boolean not null
            ) 
        returning *
            into fr_data;
    end if;
    else
    insert --+ qb_name(dmlapi_users_merge)
        into public.users
            (
            id,                                        --001 uuid
              username,                                  --002 character varying not null
              email,                                     --003 character varying
              password,                                  --004 character varying not null
              auth_whith_google                          --006 boolean not null  
            )
    values(
            fr_data.id,                                        --001 uuid
              fr_data.username,                                  --002 character varying not null
              fr_data.email,                                     --003 character varying
              fr_data.password,                                  --004 character varying not null
              fr_data.auth_whith_google                          --006 boolean not null
            )
    returning *
        into fr_data;
    end if;
    return fr_data;
exception when others then
    raise;
end;
$function$
;


----------------------------------------------------
create or replace function public.dmlapi_users_merge(fv_jsonb jsonb)
returns public.users
language plpgsql
security definer
as $function$
------------------------------------------------------------------
-- (c) Copyright 2021 Antoniel Lima (antonielliimma@gmail.com)
-- (c) Copyright 2021 desenroladev.com.br
------------------------------------------------------------------
-- dmlapi_users_merge: insert or update collection
------------------------------------------------------------------
declare
    lr_data           public.users;
    lv_jsonb          jsonb;
begin
    ------------------------------------------------------------------------------
    lr_data := public.dmlapi_users_select(fv_id      => (fv_jsonb->>'id')::uuid,
                                            fv_locking => true);
    ------------------------------------------------------------------------------
    if lr_data.id is not null then
        lv_jsonb := public.dmlapi_users_r2j(fr_data => lr_data);
        lv_jsonb := lv_jsonb || fv_jsonb;
    else
        lv_jsonb := fv_jsonb;
    end if;
    ------------------------------------------------------------------------------
    lr_data := public.dmlapi_users_j2r(fv_jsonb => lv_jsonb);
    ------------------------------------------------------------------------------
    if lr_data.id is null then
        lr_data.id := gen_random_uuid();
    end if;
    ------------------------------------------------------------------------------
    return public.dmlapi_users_merge(fr_data => lr_data, fv_old_id => (fv_jsonb->>'old_id')::uuid);
exception when others then
raise;
end; $function$;