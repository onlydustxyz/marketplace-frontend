CREATE OR REPLACE VIEW public.auth_users as
SELECT
	u.id AS id,
	up.provider_user_id::bigint AS github_user_id,
    u.email AS email,
    u.last_seen AS last_seen,
    u.display_name AS login_at_signup,
    u.avatar_url AS avatar_url_at_signup
FROM
	auth.users u
	INNER JOIN auth.user_providers up ON u.id = up.user_id AND up.provider_id = 'github';


CREATE OR REPLACE VIEW public.registered_users as
SELECT
	au.id AS id,
    au.github_user_id AS github_user_id,
    COALESCE(gu.login, au.login_at_signup) AS login,
    COALESCE(gu.avatar_url, au.avatar_url_at_signup) AS avatar_url,
    COALESCE(gu.html_url, 'https://github.com/' || au.login_at_signup) AS html_url,
    au.email AS email,
    au.last_seen AS last_seen
FROM
	public.auth_users au
    LEFT JOIN public.github_users gu ON gu.id = au.github_user_id;
