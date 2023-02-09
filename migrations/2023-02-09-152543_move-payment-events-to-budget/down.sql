DELETE FROM events;
INSERT INTO events SELECT * from events_backup;
DROP TABLE events_backup;
