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

-- start a transaction


-- Created by Diesel in schema initialization

-- extensions
-- CREATE EXTENSION IF NOT EXISTS citext WITH SCHEMA public;
-- CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;


-- functions
CREATE FUNCTION auth.set_current_timestamp_updated_at ()
    RETURNS TRIGGER
    LANGUAGE plpgsql
  AS $$
DECLARE
_new record;
BEGIN
  _new := new;
  _new. "updated_at" = now();
RETURN _new;
END;
$$;

-- domains
CREATE DOMAIN auth.email AS citext CHECK (value ~ '^[a-zA-Z0-9.!#$%&''*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$');

-- tables
CREATE TABLE auth.user_providers (
                                     id uuid DEFAULT gen_random_uuid () NOT NULL PRIMARY KEY,
                                     created_at timestamp with time zone DEFAULT now() NOT NULL,
                                     updated_at timestamp with time zone DEFAULT now() NOT NULL,
                                     user_id uuid NOT NULL,
                                     access_token text NOT NULL,
                                     refresh_token text,
                                     provider_id text NOT NULL,
                                     provider_user_id text NOT NULL,
                                     UNIQUE (user_id, provider_id),
                                     UNIQUE (provider_id, provider_user_id)
);

CREATE TABLE auth.user_roles (
                                 id uuid DEFAULT gen_random_uuid () NOT NULL PRIMARY KEY,
                                 created_at timestamp with time zone DEFAULT now() NOT NULL,
                                 user_id uuid NOT NULL,
                                 role text NOT NULL,
                                 UNIQUE (user_id, ROLE)
);

CREATE TABLE auth.users (
                            id uuid DEFAULT gen_random_uuid () NOT NULL PRIMARY KEY,
                            created_at timestamp with time zone DEFAULT now() NOT NULL,
                            updated_at timestamp with time zone DEFAULT now() NOT NULL,
                            last_seen timestamp with time zone,
                            disabled boolean DEFAULT false NOT NULL,
                            display_name text DEFAULT '' NOT NULl,
                            avatar_url text DEFAULT '' NOT NULL,
                            locale varchar(2) NOT NULL,
                            email auth.email UNIQUE,
                            phone_number text UNIQUE,
                            password_hash text,
                            email_verified boolean DEFAULT FALSE NOT NULL,
                            phone_number_verified boolean DEFAULT FALSE NOT NULL,
                            new_email auth.email,
                            otp_method_last_used text, -- used to verify the method (sms or email)
                            otp_hash text,
                            otp_hash_expires_at timestamp with time zone DEFAULT now() NOT NULL,
                            default_role text DEFAULT 'user' NOT NULL,
                            is_anonymous boolean DEFAULT FALSE NOT NULL,
                            totp_secret text,
                            active_mfa_type text, -- sms or totp
                            ticket text,
                            ticket_expires_at timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE auth.providers (
    id text NOT NULL PRIMARY KEY
);

CREATE TABLE auth.refresh_tokens (
                                     refresh_token uuid NOT NULL PRIMARY KEY,
                                     created_at timestamp with time zone DEFAULT now() NOT NULL,
                                     expires_at timestamp with time zone NOT NULL,
                                     user_id uuid NOT NULL
);

CREATE TABLE auth.roles (
    role text NOT NULL PRIMARY KEY
);

CREATE TABLE auth.provider_requests (
                                        id uuid NOT NULL PRIMARY KEY,
                                        redirect_url text NOT NULL
);

-- FKs
ALTER TABLE auth.user_providers
    ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES auth.users (id) ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE auth.user_providers
    ADD CONSTRAINT fk_provider FOREIGN KEY (provider_id) REFERENCES auth.providers (id) ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE auth.user_roles
    ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES auth.users (id) ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE auth.user_roles
    ADD CONSTRAINT fk_role FOREIGN KEY (ROLE) REFERENCES auth.roles (ROLE) ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE auth.users
    ADD CONSTRAINT fk_default_role FOREIGN KEY (default_role) REFERENCES auth.roles (ROLE) ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE auth.refresh_tokens
    ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES auth.users (id) ON UPDATE CASCADE ON DELETE CASCADE;

-- triggers

CREATE TRIGGER set_auth_user_providers_updated_at
    BEFORE UPDATE ON auth.user_providers
    FOR EACH ROW
    EXECUTE FUNCTION auth.set_current_timestamp_updated_at ();

CREATE TRIGGER set_auth_users_updated_at
    BEFORE UPDATE ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION auth.set_current_timestamp_updated_at ();

-- checks

ALTER TABLE auth.users
    ADD CONSTRAINT active_mfa_types_check
        CHECK (
                    active_mfa_type = 'totp'
                OR active_mfa_type = 'sms'
            );

-- data

INSERT INTO auth.roles (ROLE)
VALUES ('user'), ('anonymous'), ('me');

INSERT INTO auth.providers (id)
VALUES
    ('github'),
    ('facebook'),
    ('twitter'),
    ('google'),
    ('apple'),
    ('linkedin'),
    ('windowslive'),
    ('spotify'),
    ('strava'),
    ('gitlab'),
    ('bitbucket');

-- commit the change (or roll it back later)



-- start a transaction

ALTER TABLE auth.users
    ADD COLUMN metadata JSONB;



-- start a transaction

INSERT INTO auth.providers (id) VALUES ('discord'), ('twitch') ON CONFLICT DO NOTHING;


-- start a transaction


ALTER TABLE
    auth.provider_requests
DROP COLUMN redirect_url;

ALTER TABLE
    auth.provider_requests
    ADD
        COLUMN options JSONB;



-- Do not add a comment on the auth schema as the postgresql user is not necessarily the owner of the schema
-- comment on schema auth is 'Schema required by Hasura Auth to work. Don''t modify its structure as Hasura Auth relies on it to function properly.';
-- comment on table auth.migrations is 'Internal table for tracking migrations. Don''t modify its structure as Hasura Auth relies on it to function properly.';
comment on table auth.provider_requests is 'Oauth requests, inserted before redirecting to the provider''s site. Don''t modify its structure as Hasura Auth relies on it to function properly.';
comment on table auth.providers is 'List of available Oauth providers. Don''t modify its structure as Hasura Auth relies on it to function properly.';
comment on table auth.roles is 'Persistent Hasura roles for users. Don''t modify its structure as Hasura Auth relies on it to function properly.';
comment on table auth.users is 'User account information. Don''t modify its structure as Hasura Auth relies on it to function properly.';
comment on table auth.refresh_tokens is 'User refresh tokens. Hasura auth uses them to rotate new access tokens as long as the refresh token is not expired. Don''t modify its structure as Hasura Auth relies on it to function properly.';
comment on table auth.user_providers is 'Active providers for a given user. Don''t modify its structure as Hasura Auth relies on it to function properly.';
comment on table auth.user_roles is 'Roles of users. Don''t modify its structure as Hasura Auth relies on it to function properly.';

-- start a transaction


ALTER TABLE auth.users
    ADD COLUMN webauthn_current_challenge text;

CREATE TABLE auth.user_authenticators(
                                         id uuid DEFAULT gen_random_uuid () NOT NULL PRIMARY KEY,
                                         user_id uuid NOT NULL,
                                         credential_id text UNIQUE NOT NULL,
                                         credential_public_key bytea,
                                         counter bigint DEFAULT 0 NOT NULL,
                                         transports varchar(255) DEFAULT '' NOT NULL
);

COMMENT ON TABLE auth.user_authenticators IS 'User webauthn authenticators. Don''t modify its structure as Hasura Auth relies on it to function properly.';


-- FKs
ALTER TABLE auth.user_authenticators
    ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES auth.users (id) ON UPDATE CASCADE ON DELETE CASCADE;




ALTER TABLE auth.user_authenticators
    ADD COLUMN nickname text;



-- start a transaction

INSERT INTO auth.providers (id)
VALUES ('workos')
    ON CONFLICT
    DO NOTHING;


-- start a transaction

ALTER TABLE auth.user_authenticators RENAME TO user_security_keys;
ALTER TABLE auth.user_security_keys RENAME CONSTRAINT user_authenticators_credential_id_key TO user_security_key_credential_id_key;
ALTER TABLE auth.user_security_keys RENAME CONSTRAINT user_authenticators_pkey TO user_security_keys_pkey;
COMMENT ON TABLE auth.user_security_keys IS 'User webauthn security keys. Don''t modify its structure as Hasura Auth relies on it to function properly.';


-- start a transaction

INSERT INTO auth.providers (id)
VALUES ('azuread')
    ON CONFLICT
    DO NOTHING;




ALTER TABLE "auth"."refresh_tokens"
    ADD COLUMN "refresh_token_hash" VARCHAR(255) GENERATED ALWAYS AS (sha256 (refresh_token::text::bytea)) STORED;
COMMENT ON COLUMN "auth"."refresh_tokens"."refresh_token" IS 'DEPRECATED: auto-generated refresh token id. Will be replaced by a genereric id column that will be used as a primary key, not the refresh token itself. Use refresh_token_hash instead.';


