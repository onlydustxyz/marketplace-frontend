CREATE TABLE pull_requests (
  id VARCHAR PRIMARY KEY,
  project_id VARCHAR NOT NULL REFERENCES projects (id) on delete cascade,
  pr_status VARCHAR NOT NULL,
  transaction_hash VARCHAR,
  author VARCHAR NOT NULL
)
