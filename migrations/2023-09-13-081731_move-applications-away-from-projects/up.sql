INSERT INTO
    EVENTS (timestamp, aggregate_name, aggregate_id, payload) (
        SELECT
            "timestamp" AS timestamp,
            'APPLICATION' AS aggregate_name,
            payload #>> '{ Application, event, Received, id }' as aggregate_id,
            jsonb_build_object(
                'Received',
                jsonb_build_object(
                    'id',
                    payload #>> '{ Application, event, Received, id }',
                    'project_id',
                    aggregate_id,
                    'received_at',
                    payload #>> '{ Application, event, Received, received_at }',
                    'applicant_id',
                    payload #>> '{ Application, event, Received, applicant_id }'
                )
            ) AS payload
        FROM
            events
        WHERE
            payload #> '{ Application, event, Received }' IS NOT NULL
    );


INSERT INTO
    EVENTS (timestamp, aggregate_name, aggregate_id, payload) (
        SELECT
            "timestamp" AS timestamp,
            aggregate_name AS aggregate_name,
            aggregate_id as aggregate_id,
            jsonb_build_object(
                'Applied',
                jsonb_build_object(
                    'id',
                    aggregate_id,
                    'application_id',
                    payload #>> '{ Application, event, Received, id }',
                    'applicant_id',
                    payload #>> '{ Application, event, Received, applicant_id }'
                )
            ) AS payload
        FROM
            events
        WHERE
            payload #> '{ Application, event, Received }' IS NOT NULL
    );


DELETE FROM events
WHERE
    payload #> '{ Application, event, Received }' IS NOT NULL;