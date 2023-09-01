CREATE TYPE profile_cover AS ENUM('cyan', 'magenta', 'yellow', 'blue');


ALTER TABLE user_profile_info
ADD COLUMN cover profile_cover;


DROP VIEW api.user_profiles;


CREATE VIEW
    api.user_profiles AS
SELECT
    gu.id AS github_user_id,
    COALESCE(gu.login, au.login_at_signup) AS login,
    COALESCE(upi.avatar_url, gu.avatar_url, au.avatar_url_at_signup) AS avatar_url,
    COALESCE(gu.html_url, 'https://github.com/'::TEXT || au.login_at_signup) AS html_url,
    au.id AS user_id,
    au.created_at,
    au.last_seen,
    COALESCE(upi.bio, gu.bio) AS bio,
    COALESCE(upi.location, gu.location) AS "location",
    COALESCE(upi.website, gu.website) AS website,
    COALESCE(upi.languages, repos_stats.languages) AS languages,
    upi.weekly_allocated_time,
    upi.looking_for_a_job,
    upi.cover
FROM
    github_users gu
    LEFT JOIN auth_users au ON au.github_user_id = gu.id
    LEFT JOIN user_profile_info upi ON upi.id = au.id
    LEFT JOIN LATERAL (
        SELECT
            jsonb_concat_agg (gr.languages) AS languages
        FROM
            github_repos_contributors grp
            JOIN github_repos gr ON gr.id = grp.repo_id
        WHERE
            grp.user_id = gu.id
    ) repos_stats ON 1 = 1;