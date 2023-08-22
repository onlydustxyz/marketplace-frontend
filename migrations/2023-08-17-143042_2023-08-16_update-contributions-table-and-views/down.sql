DROP VIEW api.contribution_stats_v2;


DROP VIEW api.contribution_count_v2;


DROP VIEW api.completed_contributions_v2;


DROP VIEW api.contributions_v2;


ALTER TABLE contributions
DROP COLUMN status;


DROP TYPE contribution_status;


ALTER TABLE contributions
DROP COLUMN created_at;


ALTER TABLE contributions
DROP COLUMN closed_at;


ALTER TABLE projects_contributors
ADD COLUMN link_count INT NOT NULL DEFAULT 1;


DROP TABLE projects_rewarded_users;


DROP TABLE projects_pending_contributors;