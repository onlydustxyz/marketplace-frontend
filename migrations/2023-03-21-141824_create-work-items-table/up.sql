CREATE TABLE work_items (
    payment_id UUID NOT NULL,
    repo_owner TEXT NOT NULL,
    repo_name TEXT NOT NULL,
    issue_number BIGINT NOT NULL,
    PRIMARY KEY (payment_id, repo_owner, repo_name, issue_number)
);

INSERT INTO work_items
SELECT
	payment_id,
	work_item [1] AS repo_owner,
	work_item [2] AS repo_name,
	work_item [4]::bigint AS issue_number
FROM (
	SELECT
		payment_id,
		regexp_match (work_item::text,
			'"https://github.com/(.*)/(.*)/(pull|issue.?)/(.*)"') AS work_item
	FROM (
		SELECT
			id AS payment_id,
			jsonb_array_elements(reason -> 'work_items') AS work_item
		FROM
			payment_requests) AS work_items) AS work_item;

ALTER TABLE payment_requests
    DROP COLUMN reason;
