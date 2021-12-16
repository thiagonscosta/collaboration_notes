CREATE OR REPLACE FUNCTION public.exception_procedure(fv_message character varying, fv_status_code numeric, fv_code character varying)
 RETURNS void
 LANGUAGE plpgsql
AS $function$   
    begin
        raise exception 'BUSINESS_ERROR: {"message": "%", "statusCode": %, "code": "%"}', fv_message, fv_status_code, fv_code;
    end;
$function$
;
