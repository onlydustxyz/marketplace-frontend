UPDATE
	events
SET
	payload = jsonb_set_lax (events.payload,
		'{Contribution, Assigned, contributor_account_address}',
		to_jsonb (contributors.account::text),
		TRUE,
		'raise_exception') #- '{Contribution, Assigned, contributor_id}'
FROM
	contributors
WHERE
	events.payload -> 'Contribution' -> 'Assigned' ? 'contributor_id' IS NOT NULL
	AND REGEXP_REPLACE(contributors.id, '0x0*', '0x') = REGEXP_REPLACE(events.payload -> 'Contribution' -> 'Assigned' ->> 'contributor_id', '0x0*', '0x');
