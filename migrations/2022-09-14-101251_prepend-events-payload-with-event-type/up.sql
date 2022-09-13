UPDATE events
    SET payload = json_build_object('Contribution', payload)
    WHERE aggregate_name = 'CONTRIBUTION';

UPDATE events
    SET payload = json_build_object('Project', payload)
    WHERE aggregate_name = 'PROJECT';
