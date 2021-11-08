
create or replace function public.dmlapi_users_notes_merge(
    fr_data public.users_notes,
    fv_old_id uuid default null
) 
    returns public.users_notes
    language plpgsql
    security definer
as $function$
------------------------------------------------------------------
-- (c) Copyright 2021 Antoniel Lima (antonielliimma@gmail.com)
-- (c) Copyright 2021 desenroladev.com.br
------------------------------------------------------------------
-- dmlapi_users_notes_merge: insert or update
------------------------------------------------------------------
declare
    lr_data    public.users_notes;
begin
    -------------------------------------------------------------------------------------
    -- UPDATE FROM PK WITH OLD ID
    -------------------------------------------------------------------------------------
    if fv_old_id is null then
        fv_old_id := fr_data.id;
    end if;
    -------------------------------------------------------------------------------------
    if (fr_data.id is not null) then
    lr_data := public.dmlapi_users_notes_select(fv_id      => fv_old_id,
                                                                fv_locking => true);
    if (lr_data.id is not null) then
        update --+ qb_name(dmlapi_users_notes_merge)
                public.users_notes
            set 
            user_id                                   = fr_data.user_id,                                   --001 uuid not null
            note_id                                   = fr_data.note_id                                    --002 uuid not null
        where 1e1 = 1e1
            and id = fv_old_id
        returning * into fr_data;
    else
        insert --+ qb_name(dmlapi_users_notes_merge)
        into public.users_notes
            (
                user_id,                                   --001 uuid not null
              note_id                                    --002 uuid not null
            )
        values(
                fr_data.user_id,                                   --001 uuid not null
              fr_data.note_id                                    --002 uuid not null
            ) 
        returning *
            into fr_data;
    end if;
    else
    insert --+ qb_name(dmlapi_users_notes_merge)
        into public.users_notes
            (
            user_id,                                   --001 uuid not null
              note_id                                    --002 uuid not null  
            )
    values(
            fr_data.user_id,                                   --001 uuid not null
              fr_data.note_id                                    --002 uuid not null
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
create or replace function public.dmlapi_users_notes_merge(fv_jsonb jsonb)
returns public.users_notes
language plpgsql
security definer
as $function$
------------------------------------------------------------------
-- (c) Copyright 2021 Antoniel Lima (antonielliimma@gmail.com)
-- (c) Copyright 2021 desenroladev.com.br
------------------------------------------------------------------
-- dmlapi_users_notes_merge: insert or update collection
------------------------------------------------------------------
declare
    lr_data           public.users_notes;
    lv_jsonb          jsonb;
begin
    ------------------------------------------------------------------------------
    lr_data := public.dmlapi_users_notes_select(fv_id      => (fv_jsonb->>'id')::uuid,
                                            fv_locking => true);
    ------------------------------------------------------------------------------
    if lr_data.id is not null then
        lv_jsonb := public.dmlapi_users_notes_r2j(fr_data => lr_data);
        lv_jsonb := lv_jsonb || fv_jsonb;
    else
        lv_jsonb := fv_jsonb;
    end if;
    ------------------------------------------------------------------------------
    lr_data := public.dmlapi_users_notes_j2r(fv_jsonb => lv_jsonb);
    ------------------------------------------------------------------------------
    if lr_data.id is null then
        lr_data.id := gen_random_uuid();
    end if;
    ------------------------------------------------------------------------------
    return public.dmlapi_users_notes_merge(fr_data => lr_data, fv_old_id => (fv_jsonb->>'old_id')::uuid);
exception when others then
raise;
end; $function$;