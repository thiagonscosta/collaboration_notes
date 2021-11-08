
create or replace function public.dmlapi_notes_purge(
    fv_id uuid
)
    returns public.notes
    language plpgsql
    security definer
as $function$
------------------------------------------------------------------
-- (c) Copyright 2021 Antoniel Lima (antonielliimma@gmail.com)
-- (c) Copyright 2021 desenroladev.com.br
------------------------------------------------------------------
-- dmlapi_notes_purge: inactive record
------------------------------------------------------------------
declare
    lr_data    public.notes;
begin
    if (fv_id is not null) then
        lr_data := public.dmlapi_notes_select(fv_id      => fv_id,
                                                                fv_locking => true);
        if (lr_data.id is not null) then
            ------------------------------------
            delete from public.notes 
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