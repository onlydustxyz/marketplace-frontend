CREATE TABLE contributions (
  id VARCHAR PRIMARY KEY,
  project_id VARCHAR NOT NULL REFERENCES projects (id) on delete cascade,
  status VARCHAR NOT NULL,
  transaction_hash VARCHAR,
  author VARCHAR NOT NULL
)
