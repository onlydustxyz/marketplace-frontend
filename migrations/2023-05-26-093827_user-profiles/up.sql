CREATE TABLE
    user_profile_info (
        id UUID PRIMARY KEY,
        email TEXT,
        bio TEXT,
        "location" TEXT,
        website TEXT,
        twitter TEXT,
        linkedin TEXT,
        telegram TEXT,
        discord TEXT,
        languages JSONB
    );


ALTER TABLE github_users
ADD COLUMN bio TEXT,
ADD COLUMN "location" TEXT,
ADD COLUMN website TEXT,
ADD COLUMN twitter TEXT,
ADD COLUMN linkedin TEXT,
ADD COLUMN telegram TEXT;


CREATE OR REPLACE VIEW
    public.auth_users AS
SELECT
    u.id AS id,
    up.provider_user_id::BIGINT AS github_user_id,
    u.email AS email,
    u.last_seen AS last_seen,
    u.display_name AS login_at_signup,
    u.avatar_url AS avatar_url_at_signup,
    u.created_at AS created_at
FROM
    auth.users u
    INNER JOIN auth.user_providers up ON u.id = up.user_id
    AND up.provider_id = 'github';


--------------------------------------
-- Custom aggregate function that allows to merge & aggregate jsonb objects
--------------------------------------
CREATE
OR REPLACE AGGREGATE jsonb_concat_agg (jsonb) (SFUNC = 'jsonb_concat', STYPE = jsonb, INITCOND = '{}');


CREATE OR REPLACE VIEW
    user_profiles AS
SELECT
    --------------------------------------
    -- NOT NULLABLE and not overridable
    --------------------------------------
    gu.id AS github_user_id,
    COALESCE(gu.login, au.login_at_signup) AS login,
    COALESCE(gu.avatar_url, au.avatar_url_at_signup) AS avatar_url,
    COALESCE(gu.html_url, 'https://github.com/'::TEXT || au.login_at_signup) AS html_url,
    --------------------------------------
    -- NULLABLE and not overridable
    --------------------------------------
    au.id AS user_id,
    au.created_at AS created_at,
    au.last_seen AS last_seen,
    --------------------------------------
    -- NULLABLE and overridable
    --------------------------------------
    upi.email AS email,
    COALESCE(upi.bio, gu.bio) AS bio,
    COALESCE(upi.location, gu.location) AS "location",
    COALESCE(upi.website, gu.website) AS website,
    COALESCE(upi.twitter, gu.twitter) AS twitter,
    COALESCE(upi.linkedin, gu.linkedin) AS linkedin,
    COALESCE(upi.telegram, gu.telegram) AS telegram,
    upi.discord AS discord,
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
            INNER JOIN github_repos gr ON gr.id = grp.repo_id
        WHERE
            grp.user_id = gu.id
    ) AS repos_stats ON 1 = 1;


CREATE OR REPLACE VIEW
    user_contribution_counts AS
SELECT
    p.recipient_id AS github_user_id,
    DATE_PART('year', gi.created_at) AS "year",
    DATE_PART('week', gi.created_at) AS "week",
    COUNT(gi.id) AS "count"
FROM
    payment_requests p
    INNER JOIN work_items w ON w.payment_id = p.id
    INNER JOIN github_issues gi ON gi.repo_id = w.repo_id
    AND gi.issue_number = w.issue_number
GROUP BY
    github_user_id,
    "year",
    "week";


CREATE OR REPLACE VIEW
    user_contribution_projects AS
SELECT
    p.recipient_id AS github_user_id,
    b.project_id AS project_id,
    SUM(p.amount_in_usd) AS money_granted,
    SUM(contribution_stats.total_count) AS contribution_count,
    MIN(contribution_stats.min_date) AS min_contribution_date,
    MAX(contribution_stats.max_date) AS max_contribution_date
FROM
    payment_requests p
    INNER JOIN budgets b ON b.id = p.budget_id
    INNER JOIN LATERAL (
    SELECT
		COUNT(gi.id) AS total_count,
		MIN(gi.created_at) AS min_date,
		MAX(gi.created_at) AS max_date
	FROM
		work_items w
		INNER JOIN github_issues gi ON gi.repo_id = w.repo_id
			AND gi.issue_number = w.issue_number
	WHERE
		w.payment_id = p.id
	) contribution_stats ON 1=1
GROUP BY
    p.recipient_id,
    b.project_id;
