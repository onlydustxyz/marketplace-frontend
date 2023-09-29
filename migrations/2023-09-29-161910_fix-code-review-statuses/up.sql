update github_pull_request_reviews
SET
    status = 'completed'
WHERE
    outcome = 'change_requested'
    and status = 'pending';
