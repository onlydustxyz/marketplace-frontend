ALTER TABLE auth_users
ADD COLUMN "admin" BOOLEAN NOT NULL DEFAULT FALSE;


DROP VIEW registered_users;


CREATE VIEW
    registered_users AS
SELECT
    au.id,
    au.github_user_id,
    COALESCE(gu.login, au.login_at_signup) AS login,
    COALESCE(gu.avatar_url, au.avatar_url_at_signup) AS avatar_url,
    COALESCE(gu.html_url, 'https://github.com/'::TEXT || au.login_at_signup) AS html_url,
    au.email,
    au.last_seen,
    au."admin"
FROM
    auth_users au
    LEFT JOIN github_users gu ON gu.id = au.github_user_id;