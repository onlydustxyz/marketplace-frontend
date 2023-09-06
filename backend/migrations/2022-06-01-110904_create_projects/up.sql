CREATE TABLE projects (
  id VARCHAR PRIMARY KEY,
  owner VARCHAR NOT NULL,
  name VARCHAR NOT NULL,
  last_indexed_time TIMESTAMP
)
