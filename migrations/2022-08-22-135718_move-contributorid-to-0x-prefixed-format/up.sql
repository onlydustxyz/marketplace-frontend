UPDATE contributions
    SET contributor_id = '0x' || contributor_id
    WHERE contributor_id NOT LIKE '0x%'
