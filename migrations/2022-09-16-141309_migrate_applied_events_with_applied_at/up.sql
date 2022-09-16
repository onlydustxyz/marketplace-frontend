-- Migrate Applied events from this:
-- {"Contribution": {"Applied": {"id": "0x17267622", "contributor_id": "0x0666"}}}
-- to this:
-- {"Contribution": {"Applied": {"id": "0x17267621", "applied_at": "2022-09-16T14:37:11", "contributor_id": "0x0666"}}}
ALTER TABLE events ADD payload_backup jsonb;
UPDATE events SET payload_backup = payload;

UPDATE events
    SET payload = jsonb_set(payload, '{Contribution,Applied,applied_at}', to_jsonb(to_char(events."timestamp" at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS')))
    WHERE payload->'Contribution'->'Applied' is not null and payload->'Contribution'->'Applied'->'applied_at' is null;
