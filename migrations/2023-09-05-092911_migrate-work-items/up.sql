ALTER TABLE work_items
ADD COLUMN reviewer_id BIGINT,
ADD COLUMN
TYPE contribution_type NOT NULL default 'issue'::contribution_type;


ALTER TABLE work_items
rename column issue_number to number;