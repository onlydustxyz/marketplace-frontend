CREATE TYPE github_code_review_status as enum('pending', 'completed');


CREATE TYPE github_code_review_outcome as enum('change_requested', 'approved');


CREATE TABLE
    github_pull_request_reviews (
        pull_request_id BIGINT NOT NULL,
        reviewer_id BIGINT NOT NULL,
        status github_code_review_status NOT NULL,
        outcome github_code_review_outcome,
        submitted_at TIMESTAMP,
        PRIMARY KEY (pull_request_id, reviewer_id)
    );


CREATE INDEX github_pull_request_reviews_pull_request on github_pull_request_reviews (pull_request_id);