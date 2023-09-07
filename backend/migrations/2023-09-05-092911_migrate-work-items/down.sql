ALTER TABLE work_items
DROP COLUMN id,
DROP COLUMN reviewer_id,
DROP COLUMN "type";


ALTER TABLE work_items
rename column number to issue_number;