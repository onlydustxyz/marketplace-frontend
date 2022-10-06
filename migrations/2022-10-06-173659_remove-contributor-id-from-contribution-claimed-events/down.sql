UPDATE
	events
SET
	payload = jsonb_set_lax (events.payload,
		'{Contribution, Claimed, contributor_id}',
		to_jsonb (contributors.id::text),
		TRUE,
		'raise_exception') #- '{Contribution, Claimed, contributor_account_address}'
FROM
	contributors
WHERE
	events.payload -> 'Contribution' -> 'Claimed' ? 'contributor_account_address' IS NOT NULL
	AND REGEXP_REPLACE(contributors.account, '0x0*', '0x') = REGEXP_REPLACE(events.payload -> 'Contribution' -> 'Claimed' ->> 'contributor_account_address', '0x0*', '0x');
