CREATE VIEW auth.github_users AS
    SELECT *, provider_user_id::bigint as github_user_id
    FROM auth.user_providers
    WHERE provider_id = 'github' AND provider_user_id ~ '^[0-9]+$';
