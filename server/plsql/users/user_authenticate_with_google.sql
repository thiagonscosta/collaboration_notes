create or replace function public.user_authenticate_with_google(fv_jsonb jsonb)
    returns jsonb
    language plpgsql
    security definer
as $$
declare
	lv_user		jsonb;
	
	cr_find_by_email cursor(lv_email varchar) for
  	select from public.users u 
		where 1e1=1e1 
	and u.email = fv_jsonb->>'email';
	
  begin
  	open cr_find_by_email(fv_jsonb->>'email');
	fetch cr_find_by_email into lv_user;
	close cr_find_by_email;
	
	if lv_user is null then
	
	end if;
	
	if lv_jsonb->>'password' is not null then
			
	end if;
end $$;
