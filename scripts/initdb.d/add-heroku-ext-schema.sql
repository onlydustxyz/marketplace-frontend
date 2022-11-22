-- Needed to synchronize data dumped from Heroku

CREATE SCHEMA IF NOT EXISTS heroku_ext;
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;
