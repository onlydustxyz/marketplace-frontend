DROP VIEW user_profiles;


DROP VIEW user_contribution_counts;


DROP VIEW user_contribution_projects;


DROP TABLE user_profile_info;


ALTER TABLE github_users
DROP COLUMN bio,
DROP COLUMN "location",
DROP COLUMN website,
DROP COLUMN twitter,
DROP COLUMN linkedin,
DROP COLUMN telegram;


DROP AGGREGATE jsonb_concat_agg (jsonb);
