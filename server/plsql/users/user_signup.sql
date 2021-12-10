CREATE OR REPLACE FUNCTION public.user_signup(fv_jsonb jsonb)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
declare
	lv_user		  jsonb;
	lv_payload    jsonb;

	cr_user cursor(fv_email varchar) for 
	select jsonb_build_object(
		'id'		,	u.id,
		'username'	, 	u.username,
		'email'		, 	u.email
	) from users u 
		where 1=1 
	and u.email = fv_email;

  	begin

  	open cr_user(fv_jsonb->>'email');
  	fetch cr_user into lv_user;
  	close cr_user;
  
  	if lv_user is not null then 
  		if lv_user->>'auth_with_google' then
  			perform public.user_authenticate_with_google(fv_jsonb->>'email');
  		else 
  			perform public.exception_procedure(
				fv_message => 'User already exists',
				fv_status_code => 422,
				fv_code => 'PEP-NF:001'
			);
		end if;
	end if;

	if fv_jsonb->>'auth_with_google' then 
        lv_user := row_to_json(dmlapi_users_merge(fv_jsonb));
    end if;

	if fv_jsonb->>'password' is not null then
		lv_user := dmlapi_users_merge(jsonb_build_object(
			'username'	,	fv_jsonb->>'username',
			'email'		,	fv_jsonb->>'email',
			'auth_with_google'	,	false,
			'password'	,	crypt(fv_jsonb->>'password', gen_salt('bf'))
		));
	end if;
		
	open cr_user(lv_user->>'email');
	fetch cr_user into lv_payload;
  	close cr_user;
	
	return lv_payload;
end $function$
;
