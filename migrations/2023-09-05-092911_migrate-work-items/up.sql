ALTER TABLE work_items
ADD COLUMN id BIGINT,
ADD COLUMN "type" contribution_type,
ADD COLUMN reviewer_id BIGINT;


ALTER TABLE work_items
RENAME COLUMN issue_number TO number;

