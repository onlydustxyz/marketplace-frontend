INSERT INTO events(aggregate_name, aggregate_id, payload)
SELECT 'CONTRIBUTION', applications.contribution_id, json_build_object('Applied', json_build_object('id', applications.contribution_id, 'contributor_id', applications.contributor_id))
FROM applications
WHERE applications.status = 'pending'
