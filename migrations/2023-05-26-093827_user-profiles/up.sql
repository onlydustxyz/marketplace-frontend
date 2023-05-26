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
    u.created_at AS created_at,
    u.updated_at AS updated_at
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
    au.updated_at AS updated_at,
    au.last_seen AS last_seen,
    contribution_stats.min_date AS first_contributed_at,
    contribution_stats.total_count AS total_contribution_count,
    (
        SELECT
            SUM(amount_in_usd)
        FROM
            payment_requests
        WHERE
            recipient_id = gu.id
    ) AS total_money_granted,
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
            COUNT(gi.id) AS total_count,
            MIN(COALESCE(gi.merged_at, gi.created_at)) AS min_date
        FROM
            payment_requests p
            INNER JOIN work_items w ON w.payment_id = p.id
            INNER JOIN github_issues gi ON gi.repo_id = w.repo_id
            AND gi.issue_number = w.issue_number
        WHERE
            p.recipient_id = gu.id
    ) AS contribution_stats ON 1 = 1
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
    DATE_PART('year', COALESCE(gi.merged_at, gi.created_at)) AS "year",
    DATE_PART('week', COALESCE(gi.merged_at, gi.created_at)) AS "week",
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