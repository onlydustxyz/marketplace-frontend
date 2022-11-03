UPDATE events
SET payload = json_build_object('Contribution', payload)
WHERE aggregate_name = 'CONTRIBUTION'
AND payload -> 'Contribution' IS NULL;

UPDATE events
SET payload = json_build_object('Project', payload)
WHERE aggregate_name = 'PROJECT'
AND payload -> 'Project' IS NULL;

UPDATE events
SET payload = json_build_object('Contributor', payload)
WHERE aggregate_name = 'CONTRIBUTOR'
AND payload -> 'Contributor' IS NULL;
