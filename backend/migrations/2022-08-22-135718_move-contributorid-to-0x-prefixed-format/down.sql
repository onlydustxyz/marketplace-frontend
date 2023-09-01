UPDATE contributions
    SET contributor_id = right(contributor_id, -2)
    WHERE contributor_id LIKE '0x%'
