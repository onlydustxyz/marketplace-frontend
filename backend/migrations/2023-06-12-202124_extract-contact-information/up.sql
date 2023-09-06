DROP VIEW public.user_profiles;


CREATE TYPE contact_channel AS ENUM('email', 'telegram', 'twitter', 'discord', 'linkedin');


CREATE TABLE
    contact_informations (
        user_id UUID NOT NULL,
        channel contact_channel NOT NULL,
        contact TEXT NOT NULL,
        public BOOLEAN NOT NULL,
        PRIMARY KEY (user_id, channel)
    );


INSERT INTO
    contact_informations
SELECT
    id,
    'email',
    email,
    TRUE
FROM
    user_profile_info
WHERE
    email IS NOT NULL;


INSERT INTO
    contact_informations
SELECT
    id,
    'telegram',
    telegram,
    TRUE
FROM
    user_profile_info
WHERE
    telegram IS NOT NULL;


INSERT INTO
    contact_informations
SELECT
    id,
    'twitter',
    twitter,
    TRUE
FROM
    user_profile_info
WHERE
    twitter IS NOT NULL;


INSERT INTO
    contact_informations
SELECT
    id,
    'discord',
    discord,
    TRUE
FROM
    user_profile_info
WHERE
    discord IS NOT NULL;


INSERT INTO
    contact_informations
SELECT
    id,
    'linkedin',
    linkedin,
    TRUE
FROM
    user_profile_info
WHERE
    linkedin IS NOT NULL;


ALTER TABLE user_profile_info
DROP COLUMN email,
DROP COLUMN telegram,
DROP COLUMN twitter,
DROP COLUMN discord,
DROP COLUMN linkedin;


CREATE OR REPLACE VIEW
    api.user_profiles AS
SELECT
    gu.id AS github_user_id,
    COALESCE(gu.login, au.login_at_signup) AS LOGIN,
    COALESCE(gu.avatar_url, au.avatar_url_at_signup) AS avatar_url,
    COALESCE(gu.html_url, 'https://github.com/'::TEXT || au.login_at_signup) AS html_url,
    au.id AS user_id,
    au.created_at,
    au.last_seen,
    COALESCE(upi.bio, gu.bio) AS bio,
    COALESCE(upi.location, gu.location) AS LOCATION,
    COALESCE(upi.website, gu.website) AS website,
    COALESCE(upi.languages, repos_stats.languages) AS languages
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


CREATE OR REPLACE VIEW
    api.contact_informations AS
SELECT
    gu.id AS github_user_id,
    'telegram'::contact_channel AS channel,
    COALESCE(ci.contact, gu.telegram) AS contact,
    COALESCE(ci.public, TRUE) AS public
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
    COALESCE(ci.public, TRUE) AS public
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
    COALESCE(ci.public, TRUE) AS public
FROM
    github_users gu
    LEFT JOIN auth_users au ON au.github_user_id = gu.id
    LEFT JOIN contact_informations ci ON ci.user_id = au.id
    AND ci.channel = 'linkedin'::contact_channel
UNION
SELECT
    gu.id AS github_user_id,
    'email'::contact_channel AS channel,
    COALESCE(ci.contact, au.email) AS contact,
    COALESCE(ci.public, TRUE) AS public
FROM
    github_users gu
    LEFT JOIN auth_users au ON au.github_user_id = gu.id
    LEFT JOIN contact_informations ci ON ci.user_id = au.id
    AND ci.channel = 'email'::contact_channel
UNION
SELECT
    au.github_user_id AS github_user_id,
    ci.channel AS channel,
    ci.contact AS contact,
    ci.public AS public
FROM
    contact_informations ci
    LEFT JOIN auth_users au ON ci.user_id = au.id
WHERE
    ci.channel = 'discord'::contact_channel;