DROP VIEW api.contact_informations;


DROP VIEW api.user_profiles;


CREATE VIEW
    api.contact_informations AS
SELECT
    gu.id AS github_user_id,
    'telegram'::contact_channel AS channel,
    COALESCE(ci.contact, gu.telegram) AS contact,
    COALESCE(ci.public, true) AS public
FROM
    github_users gu
    LEFT JOIN auth_users au ON au.github_user_id = gu.id
    LEFT JOIN contact_informations ci ON ci.user_id = au.id
    AND ci.channel = 'telegram'::contact_channel
UNION
SELECT
    gu.id AS github_user_id,
    'twitter'::contact_channel AS channel,
    COALESCE(ci.contact, gu.twitter) AS contact,
    COALESCE(ci.public, true) AS public
FROM
    github_users gu
    LEFT JOIN auth_users au ON au.github_user_id = gu.id
    LEFT JOIN contact_informations ci ON ci.user_id = au.id
    AND ci.channel = 'twitter'::contact_channel
UNION
SELECT
    gu.id AS github_user_id,
    'linkedin'::contact_channel AS channel,
    COALESCE(ci.contact, gu.linkedin) AS contact,
    COALESCE(ci.public, true) AS public
FROM
    github_users gu
    LEFT JOIN auth_users au ON au.github_user_id = gu.id
    LEFT JOIN contact_informations ci ON ci.user_id = au.id
    AND ci.channel = 'linkedin'::contact_channel
UNION
SELECT
    COALESCE(gu.id, au.github_user_id) AS github_user_id,
    'email'::contact_channel AS channel,
    COALESCE(ci.contact, au.email::text) AS contact,
    COALESCE(ci.public, false) AS public
FROM
    github_users gu
    FULL JOIN auth_users au ON au.github_user_id = gu.id
    LEFT JOIN contact_informations ci ON ci.user_id = au.id
    AND ci.channel = 'email'::contact_channel
UNION
SELECT
    au.github_user_id,
    ci.channel,
    ci.contact,
    ci.public
FROM
    contact_informations ci
    LEFT JOIN auth_users au ON ci.user_id = au.id
WHERE
    ci.channel = 'discord'::contact_channel;


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
            github_repos_contributors grp
            JOIN github_repos gr ON gr.id = grp.repo_id
        WHERE
            grp.user_id = gu.id
    ) repos_stats ON 1 = 1;


INSERT INTO
    onboardings (user_id, profile_wizard_display_date) (
        SELECT
            id,
            now()
        FROM
            user_profile_info
    ) ON CONFLICT (user_id)
DO
UPDATE
SET
    profile_wizard_display_date = now();