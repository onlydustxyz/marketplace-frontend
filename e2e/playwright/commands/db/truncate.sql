CREATE FUNCTION pg_temp.truncate_schema (schema_name TEXT) RETURNS void AS $$
DECLARE
    table_name text;
BEGIN
    FOR table_name IN (SELECT tablename FROM pg_tables WHERE schemaname = schema_name AND tablename != '__diesel_schema_migrations')
    LOOP
        EXECUTE 'TRUNCATE TABLE ' || table_name || ' RESTART IDENTITY CASCADE';
    END LOOP;
END $$ LANGUAGE plpgsql;


SELECT
    pg_temp.truncate_schema ('public');


TRUNCATE "auth"."provider_requests" RESTART IDENTITY CASCADE;


TRUNCATE "auth"."user_roles" RESTART IDENTITY CASCADE;


TRUNCATE "auth"."users" RESTART IDENTITY CASCADE;


TRUNCATE "auth"."refresh_tokens" RESTART IDENTITY CASCADE;


TRUNCATE "auth"."user_providers" RESTART IDENTITY CASCADE;


TRUNCATE "auth"."user_security_keys" RESTART IDENTITY CASCADE;