ALTER TABLE github_pull_request_commits
DROP CONSTRAINT github_pull_request_commits_pkey;


DROP INDEX github_pull_request_commits_pull_request;


ALTER TABLE github_pull_request_commits
ADD PRIMARY KEY (pull_request_id, sha);