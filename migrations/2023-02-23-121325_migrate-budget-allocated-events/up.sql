-- Insert 1 Budget created event for each budget allocated event
INSERT INTO events(timestamp, aggregate_name, aggregate_id, payload) (
	SELECT
		timestamp,
		aggregate_name,
		aggregate_id,
		json_build_object(
			'Budget', json_build_object(
				'id', payload -> 'Budget' -> 'id',
				'event', json_build_object(
					'Created', json_build_object(
						'id', payload -> 'Budget' -> 'event' -> 'Allocated' -> 'id',
						'currency', payload -> 'Budget' -> 'event' -> 'Allocated' -> 'amount' -> 'currency'
					)
				)
			)
		) AS payload
	FROM
		events
	WHERE
		payload -> 'Budget' -> 'event' ? 'Allocated');

-- Update Budget allocated events
UPDATE
	events
SET
	payload = json_build_object(
		'Budget', json_build_object(
			'id', payload -> 'Budget' -> 'id',
			'event', json_build_object(
				'Allocated', json_build_object(
					'id', payload -> 'Budget' -> 'event' -> 'Allocated' -> 'id',
					'amount', payload -> 'Budget' -> 'event' -> 'Allocated' -> 'amount' -> 'amount'
				)
			)
		)
	),
    timestamp = timestamp + interval '1 second' -- After the Budget::Created event
WHERE
	payload -> 'Budget' -> 'event' ? 'Allocated';
