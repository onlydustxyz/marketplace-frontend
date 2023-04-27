ALTER TABLE github_pulls
    DROP COLUMN type,
    DROP COLUMN status,
    DROP COLUMN title,
    DROP COLUMN html_url,
    DROP COLUMN closed_at;
