DROP VIEW api.contribution_stats;


DROP VIEW api.contribution_counts;


DROP VIEW api.completed_contributions;


DROP VIEW api.contributions;


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
