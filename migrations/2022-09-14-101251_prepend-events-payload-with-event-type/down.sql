UPDATE events
SET payload = payload->'Contribution'
WHERE aggregate_name = 'CONTRIBUTION';

UPDATE events
SET payload = payload->'Project'
WHERE aggregate_name = 'PROJECT';
