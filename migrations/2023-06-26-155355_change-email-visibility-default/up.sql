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
    COALESCE(ci.contact, au.email::TEXT) AS contact,
    COALESCE(ci.public, FALSE) AS public
FROM
    github_users gu
    LEFT JOIN auth_users au ON au.github_user_id = gu.id
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
