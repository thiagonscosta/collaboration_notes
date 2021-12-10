CREATE OR REPLACE FUNCTION public.user_authenticate_with_google(fv_jsonb jsonb)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
declare
	lv_user		record;
	lv_payload  jsonb;
	
	cr_find_by_email cursor(lv_email varchar) for
  	select u.id from public.users u 
		where 1e1=1e1 
	and u.email = fv_jsonb->>'email';

	cr_user cursor(lv_id uuid) for
	select jsonb_build_object(
		'id',	u.id,
		'email',	u.email,
		'username',	u.username
	) from public.users u 
		where 1e1=1e1
	and u.id = id;
	
  begin

	open cr_find_by_email(fv_jsonb->>'email');
	fetch cr_find_by_email into lv_user;
	close cr_find_by_email;
	
	if lv_user is null then
		perform public.exception_procedure(
			fv_message => 'Usuário não encontrado',
			fv_status_code => 404,
			fv_code => 'PEP-NF:001'
		);
	end if;

	open cr_user(lv_user.id);
	fetch cr_user into lv_payload;
	close cr_user;

	return lv_payload;
end $function$
;
