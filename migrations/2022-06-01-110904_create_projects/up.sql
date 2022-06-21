CREATE TABLE projects (
  id VARCHAR PRIMARY KEY,
  organisation VARCHAR NOT NULL,
  repository VARCHAR NOT NULL,
  last_indexed_time TIMESTAMP
)