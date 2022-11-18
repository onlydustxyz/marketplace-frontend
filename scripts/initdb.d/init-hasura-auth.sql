-- This migration is needed so that hasura auth can populate its auth schema

-- It is duplicated in migrations/2022-11-15-145459_create-hasura-auth-schema/up.sql
-- so that it runs also on deploy in Heroku

-- auth schema
CREATE SCHEMA IF NOT EXISTS auth;
-- https://github.com/hasura/graphql-engine/issues/3657
CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE EXTENSION IF NOT EXISTS citext;
CREATE OR REPLACE FUNCTION public.set_current_timestamp_updated_at() RETURNS trigger LANGUAGE plpgsql AS $$
declare _new record;
begin _new := new;
_new."updated_at" = now();
return _new;
end;
$$;
