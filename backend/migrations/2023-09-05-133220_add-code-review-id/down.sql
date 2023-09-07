ALTER TABLE github_pull_request_reviews
DROP COLUMN id;


ALTER TABLE github_pull_request_reviews
ADD PRIMARY KEY (pull_request_id, reviewer_id);


ALTER TABLE work_items
ADD COLUMN reviewer_id BIGINT;