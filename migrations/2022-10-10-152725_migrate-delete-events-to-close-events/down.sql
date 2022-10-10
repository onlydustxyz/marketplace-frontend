UPDATE
    events
SET
    payload = jsonb_build_object ('Contribution',
        jsonb_build_object('Deleted',
            payload -> 'Contribution' -> 'Closed'
        )
    )
WHERE
	events.payload -> 'Contribution' -> 'Closed' IS NOT NULL
