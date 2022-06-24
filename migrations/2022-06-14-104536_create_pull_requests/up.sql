CREATE TABLE pull_requests (
  id VARCHAR PRIMARY KEY,
  project_id VARCHAR NOT NULL REFERENCES projects (id) on delete cascade,
  pr_status VARCHAR NOT NULL,
  smart_contract_update_time VARCHAR,
  author VARCHAR NOT NULL
)
