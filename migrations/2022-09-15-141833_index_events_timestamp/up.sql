DROP INDEX events_aggregate_idx;
CREATE INDEX events_aggregate_idx ON events (AGGREGATE_ID, AGGREGATE_NAME, TIMESTAMP, INDEX);

CREATE INDEX events_aggregate_name_idx ON events (AGGREGATE_NAME, TIMESTAMP, INDEX);
