INSERT INTO
    contributions (id, repo_id, user_id, "type", details_id, status, created_at, closed_at) (
        SELECT
            encode(sha256(row ('pull_request'::contribution_type, id, author_id)::text::bytea), 'hex') as id,
            repo_id,
            author_id,
            'pull_request'::contribution_type as "type",
            id as details_id,
            CASE
                WHEN status = 'open'::github_pull_request_status THEN 'in_progress'::contribution_status
                WHEN status = 'merged'::github_pull_request_status THEN 'complete'::contribution_status
                WHEN status = 'closed'::github_pull_request_status THEN 'canceled'::contribution_status
            END as status,
            created_at,
            closed_at
        from
            github_pull_requests
    ) ON CONFLICT
DO NOTHING;
