drop view api.user_profiles;


create view
    api.user_profiles as
SELECT
    gu.id AS github_user_id,
    COALESCE(gu.login, au.login_at_signup) AS login,
    COALESCE(gu.avatar_url, au.avatar_url_at_signup) AS avatar_url,
    COALESCE(gu.html_url, 'https://github.com/'::text || au.login_at_signup) AS html_url,
    au.id AS user_id,
    au.created_at,
    au.last_seen,
    COALESCE(upi.bio, gu.bio) AS bio,
    COALESCE(upi.location, gu.location) AS location,
    COALESCE(upi.website, gu.website) AS website,
    COALESCE(upi.languages, repos_stats.languages) AS languages,
    upi.weekly_allocated_time as weekly_allocated_time,
    upi.looking_for_a_job as looking_for_a_job
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