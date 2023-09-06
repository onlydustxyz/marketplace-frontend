CREATE TABLE events_backup (
	LIKE events INCLUDING ALL
);

INSERT INTO events_backup
SELECT
	*
FROM
	events;
