CREATE TABLE pull_requests (
  id VARCHAR PRIMARY KEY,
  pr_status VARCHAR NOT NULL,
  pr_smart_contract_status VARCHAR NOT NULL,
  author VARCHAR NOT NULL
)