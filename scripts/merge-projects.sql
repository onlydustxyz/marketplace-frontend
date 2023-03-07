-- EVENTS

-- EVENTS - Project Created
DELETE FROM events WHERE aggregate_id = :'old' AND payload ? 'Created';

-- EVENTS - Budget Created
DELETE FROM events WHERE aggregate_id = :'old' AND payload -> 'Budget' -> 'event' ? 'Created';

-- EVENTS - Leader Assigned / Unassigned
DELETE FROM events WHERE aggregate_id = :'old' AND (payload ? 'LeaderAssigned' OR payload ? 'LeaderUnassigned');

-- EVENTS - others
UPDATE
	events
SET
	aggregate_id = :'new',
    payload = replace(replace(payload::text, :'old', :'new'), :'budget_old', :'budget_new')::jsonb
WHERE
	aggregate_id = :'old';

UPDATE
	events
SET
	timestamp = (
		SELECT
			min(timestamp)
		FROM
			events
		WHERE
			aggregate_id = :'new') - interval '1 second'
	WHERE
		aggregate_id = :'new'
		AND payload -> 'Budget' -> 'event' ? 'Created';

UPDATE
	events
SET
	timestamp = (
		SELECT
			min(timestamp)
		FROM
			events
		WHERE
			aggregate_id = :'new') - interval '1 second'
	WHERE
		aggregate_id = :'new'
		AND payload ? 'Created';

-- PENDING INVITATIONS
UPDATE
	pending_project_leader_invitations
SET
	project_id = :'new'
WHERE
	project_id::text = :'old';

-- PROJECT DETAILS
DELETE FROM project_details
WHERE project_id::text = :'old';

-- PROJECT GITHUB REPOS
UPDATE
	project_github_repos
SET
	project_id = :'new'
WHERE
	project_id::text = :'old';

-- BUDGETS (event-sourced)
DELETE FROM PAYMENTS;
DELETE FROM PAYMENT_REQUESTS;
DELETE FROM BUDGETS;

-- PROJECT LEADS (event-sourced)
DELETE FROM PROJECT_LEADS;

-- PROJECTS (event sourced)
DELETE FROM PROJECTS;

-- PROJECTS SPONSORS (table is empty)
