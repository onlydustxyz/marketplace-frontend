DROP VIEW api.user_profiles;


CREATE VIEW
    api.user_profiles AS
SELECT
    COALESCE(gu.id, au.github_user_id) AS github_user_id,
    COALESCE(gu.login, au.login_at_signup) AS login,
    COALESCE(upi.avatar_url, gu.avatar_url, au.avatar_url_at_signup) AS avatar_url,
    COALESCE(gu.html_url, 'https://github.com/'::text || au.login_at_signup) AS html_url,
    au.id AS user_id,
    au.created_at,
    au.last_seen,
    COALESCE(upi.bio, gu.bio) AS bio,
    COALESCE(upi.location, gu.location) AS location,
    COALESCE(upi.website, gu.website) AS website,
    COALESCE(upi.languages, repos_stats.languages) AS languages,
    upi.weekly_allocated_time,
    upi.looking_for_a_job,
    upi.cover
FROM
    github_users gu
    FULL JOIN auth_users au ON au.github_user_id = gu.id
    LEFT JOIN user_profile_info upi ON upi.id = au.id
    LEFT JOIN LATERAL (
        SELECT
            jsonb_concat_agg (gr.languages) AS languages
        FROM
            contributions c
            JOIN github_repos gr ON gr.id = c.repo_id
        WHERE
            c.user_id = gu.id
    ) repos_stats ON 1 = 1;


DROP TABLE github_repos_contributors;