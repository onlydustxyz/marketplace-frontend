ALTER TABLE github_repo_indexes
ADD COLUMN indexed_at TIMESTAMP;


ALTER TABLE github_user_indexes
ADD COLUMN indexed_at TIMESTAMP;


CREATE VIEW
    api.github_repos AS
SELECT
    r.id,
    r.OWNER,
    r.NAME,
    r.description,
    r.stars,
    r.fork_count,
    r.html_url,
    r.languages,
    r.parent_id,
    r.has_issues,
    r.updated_at,
    i.indexed_at
FROM
    public.github_repos r
    LEFT JOIN public.github_repo_indexes i ON i.repo_id = r.id;