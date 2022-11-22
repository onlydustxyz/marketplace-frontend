-- Needed to synchronize data dumped from Heroku

CREATE EXTENSION IF NOT EXISTS pg_stat_statements;
CREATE SCHEMA IF NOT EXISTS heroku_ext;

ALTER DATABASE marketplace_db SET search_path = "$user", public, heroku_ext, auth;
