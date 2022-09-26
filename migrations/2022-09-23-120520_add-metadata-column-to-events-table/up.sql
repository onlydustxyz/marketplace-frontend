ALTER TABLE events
ADD metadata JSONB;

ALTER TABLE events
ADD origin TEXT;

UPDATE events
SET origin = 'starknet';

UPDATE events
SET origin = 'backend'
WHERE aggregate_name = 'CONTRIBUTION'
    AND (payload->'Contribution' ? 'Applied' OR  payload->'Contribution' ? 'ApplicationRefused');

UPDATE events
SET origin = 'backend'
WHERE aggregate_name = 'CONTRIBUTOR' AND payload->'Contributor' ? 'GithubAccountAssociated';

ALTER TABLE events ALTER COLUMN origin SET NOT NULL;
