INSERT INTO
    auth_users
SELECT
    u.id,
    up.provider_user_id::BIGINT,
    u.email,
    u.last_seen,
    u.display_name,
    u.avatar_url,
    u.created_at
FROM
    auth.users u
    INNER JOIN auth.user_providers up ON up.user_id = u.id ON CONFLICT
DO NOTHING;