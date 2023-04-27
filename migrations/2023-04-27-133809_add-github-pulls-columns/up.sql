ALTER TABLE github_pulls
    ADD COLUMN type jsonb NOT NULL DEFAULT '{}'::jsonb,
    ADD COLUMN status jsonb NOT NULL DEFAULT '{}'::jsonb,
    ADD COLUMN title TEXT NOT NULL DEFAULT '',
    ADD COLUMN html_url TEXT NOT NULL DEFAULT '',
    ADD COLUMN closed_at TIMESTAMP;
