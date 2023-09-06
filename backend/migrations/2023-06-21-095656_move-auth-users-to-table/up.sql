-- ----------------------------------------
-- DROP ALL DEPENDENCIES
-- ----------------------------------------
DROP VIEW registered_users;


DROP VIEW api.contact_informations;


DROP VIEW api.user_profiles;


-- ----------------------------------------
-- TURN `auth_users` VIEW INTO A TABLE
-- ----------------------------------------
DROP VIEW auth_users;


CREATE TABLE
    auth_users (
        id UUID PRIMARY KEY,
        github_user_id BIGINT,
        email CITEXT,
        last_seen TIMESTAMP,
        login_at_signup TEXT NOT NULL,
        avatar_url_at_signup TEXT,
        created_at TIMESTAMP NOT NULL
    );


CREATE UNIQUE INDEX auth_users_github_user_id_idx ON auth_users (github_user_id)
WHERE
    github_user_id IS NOT NULL;


-- ----------------------------------------
-- TRIGGER UPON CHANGE ON auth.users
-- ----------------------------------------
CREATE
OR REPLACE FUNCTION public.replicate_users_changes () RETURNS TRIGGER AS $$
BEGIN
	IF TG_OP = 'INSERT' THEN
		INSERT INTO auth_users (id, email, last_seen, login_at_signup, avatar_url_at_signup, created_at)
			VALUES(NEW.id, NEW.email, NEW.last_seen, NEW.display_name, NEW.avatar_url, NEW.created_at);
	ELSIF TG_OP = 'UPDATE' THEN
		UPDATE
			auth_users
		SET
			email = NEW.email,
			last_seen = NEW.last_seen,
			login_at_signup = NEW.display_name,
			avatar_url_at_signup = NEW.avatar_url,
			created_at = NEW.created_at
		WHERE
			id = NEW.id;
	ELSIF TG_OP = 'DELETE' THEN
		DELETE FROM auth_users
		WHERE id = OLD.id;
	END IF;
	RETURN NULL;
END;
$$ LANGUAGE plpgsql;


CREATE
OR REPLACE TRIGGER replicate_users_changes_trigger
AFTER INSERT
OR
UPDATE
OR DELETE ON auth.users FOR EACH ROW
EXECUTE FUNCTION replicate_users_changes ();


-- ----------------------------------------
-- TRIGGER UPON CHANGE ON auth.user_providers
-- ----------------------------------------
CREATE
OR REPLACE FUNCTION public.replicate_user_providers_changes () RETURNS TRIGGER AS $$
BEGIN
	IF TG_OP = 'INSERT' AND NEW.provider_id = 'github' THEN
		UPDATE
			auth_users
		SET
			github_user_id = NEW.provider_user_id::bigint
		WHERE
			id = NEW.user_id;
	ELSIF TG_OP = 'UPDATE' AND NEW.provider_id = 'github' THEN
		UPDATE
			auth_users
		SET
			github_user_id = NEW.provider_user_id::bigint
		WHERE
			id = NEW.user_id;
	ELSIF TG_OP = 'DELETE' AND OLD.provider_id = 'github' THEN
		UPDATE
			auth_users
		SET
			github_user_id = NULL
		WHERE
			id = OLD.user_id;
	END IF;
	RETURN NULL;
END;
$$ LANGUAGE plpgsql;


CREATE
OR REPLACE TRIGGER replicate_user_providers_changes_trigger
AFTER INSERT
OR
UPDATE
OR DELETE ON auth.user_providers FOR EACH ROW
EXECUTE FUNCTION replicate_user_providers_changes ();


-- ----------------------------------------
-- RE-CREATE DEPENDENCIES
-- ----------------------------------------
create view
    registered_users as
SELECT
    au.id,
    au.github_user_id,
    COALESCE(gu.login, au.login_at_signup) AS login,
    COALESCE(gu.avatar_url, au.avatar_url_at_signup) AS avatar_url,
    COALESCE(gu.html_url, 'https://github.com/'::text || au.login_at_signup) AS html_url,
    au.email,
    au.last_seen
FROM
    auth_users au
    LEFT JOIN github_users gu ON gu.id = au.github_user_id;


create view
    api.contact_informations as
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
    gu.id AS github_user_id,
    'email'::contact_channel AS channel,
    COALESCE(ci.contact, au.email::text) AS contact,
    COALESCE(ci.public, true) AS public
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
    upi.weekly_allocated_time,
    upi.looking_for_a_job
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