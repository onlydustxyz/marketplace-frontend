UPDATE events
SET payload = jsonb_set(payload - 'requested_at', '{Requested,requested_at}', payload -> 'requested_at', TRUE)
WHERE payload ? 'requested_at' AND payload ? 'Requested';
