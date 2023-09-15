SELECT
    SUM(COUNT) AS indexer_count
FROM
    (
        SELECT
            COUNT(*) AS COUNT
        FROM
            github_repo_indexes
        WHERE
            indexed_at IS NULL
        UNION ALL
        SELECT
            COUNT(*) AS COUNT
        FROM
            github_user_indexes
        WHERE
            indexed_at IS NULL
    ) AS counts;
