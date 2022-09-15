DROP INDEX events_aggregate_idx;
CREATE INDEX events_aggregate_idx ON events (AGGREGATE_NAME, AGGREGATE_ID);

DROP INDEX events_aggregate_name_idx;
