CREATE OR REPLACE FUNCTION public.user_find_by_id(fv_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
	declare 
		lv_payload		jsonb;
	
		cr_user cursor(lv_id uuid) for
		select 
			jsonb_build_object(
				'id'	,	u.id
			)
		from users u 
		where 1=1
		and u.id = lv_id;
	BEGIN
		open cr_user(fv_id);
		fetch cr_user into lv_payload;
		close cr_user;
		
		return lv_payload;
	END;
$function$
;
