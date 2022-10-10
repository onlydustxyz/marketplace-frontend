UPDATE
    events
SET
    payload = jsonb_build_object ('Contribution',
        jsonb_build_object('Closed',
            payload -> 'Contribution' -> 'Deleted'
        )
    )
WHERE
	events.payload -> 'Contribution' -> 'Deleted' IS NOT NULL
