DROP VIEW api.commands;


DROP SCHEMA api;


ALTER TABLE events
DROP COLUMN command_id;


DROP TABLE commands;