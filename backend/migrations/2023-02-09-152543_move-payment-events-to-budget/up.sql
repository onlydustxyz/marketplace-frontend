-- Backup events
CREATE TABLE events_backup (
	LIKE events INCLUDING ALL
);

INSERT INTO events_backup
SELECT
	*
FROM
	events;

-- Move payment requested events to Project
UPDATE events
SET
    aggregate_name = 'PROJECT',
    aggregate_id = projects.id,
    payload = json_build_object(
        'Budget', json_build_object(
            'id', projects.id,
            'event', json_build_object(
                'Payment', json_build_object(
                    'id', budgets.id,
                    'event', json_build_object(
                        'Requested', json_build_object(
                            'id', payload -> 'Requested' -> 'id',
                            'reason',payload -> 'Requested' -> 'reason',
                            'recipient_id', payload -> 'Requested' -> 'recipient_id',
                            'requested_at', payload -> 'Requested' -> 'requested_at',
                            'requestor_id', payload -> 'Requested' -> 'requestor_id',
                            'amount', json_build_object(
                                'amount', payload -> 'Requested' ->> 'amount_in_usd'::TEXT,
                                'currency', json_build_object(
                                    'Crypto', 'USDC'
                                )
                            )
                        )
                    )
                )
            )
        )
    )
FROM
	projects, budgets, payment_requests
WHERE
	payload ? 'Requested' AND
	projects.id = budgets.project_id AND
	budgets.id = payment_requests.budget_id AND
	payment_requests.id::TEXT = payload -> 'Requested' ->> 'id';

-- Move payment processed events to Project
UPDATE events
SET
    aggregate_name = 'PROJECT',
    aggregate_id = projects.id,
    payload = json_build_object(
        'Budget', json_build_object(
            'id', projects.id,
            'event', json_build_object(
                'Payment', json_build_object(
                    'id', budgets.id,
                    'event', payload
                )
            )
        )
    )
FROM
	projects, budgets, payment_requests
WHERE
	payload ? 'Processed' AND
	projects.id = budgets.project_id AND
	budgets.id = payment_requests.budget_id AND
	payment_requests.id::TEXT = payload -> 'Processed' ->> 'id';


-- Move payment cancelled events to Project
UPDATE events
SET
    aggregate_name = 'PROJECT',
    aggregate_id = projects.id,
    payload = json_build_object(
        'Budget', json_build_object(
            'id', projects.id,
            'event', json_build_object(
                'Payment', json_build_object(
                    'id', budgets.id,
                    'event', payload
                )
            )
        )
    )
FROM
	projects, budgets, payment_requests
WHERE
	payload ? 'Cancelled' AND
	projects.id = budgets.project_id AND
	budgets.id = payment_requests.budget_id AND
	payment_requests.id::TEXT = payload -> 'Cancelled' ->> 'id';


-- Delete budget spent events
DELETE FROM events WHERE payload -> 'Budget' -> 'event' ? 'Spent';

-- Delete remaining events as they concern cancelled payment requests
DELETE FROM events WHERE aggregate_name != 'PROJECT';
