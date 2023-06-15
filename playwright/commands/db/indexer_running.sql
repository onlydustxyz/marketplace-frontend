SELECT
    SUM(count) AS indexer_count
FROM
    (
        SELECT
            COUNT(*) AS count
        FROM
            github_repo_indexes
        WHERE
            repo_indexer_state IS NULL
        UNION ALL
        SELECT
            count(*) AS count
        FROM
            github_user_indexes
        WHERE
            user_indexer_state IS NULL
    ) as counts;