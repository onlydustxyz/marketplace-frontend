CREATE TABLE contribution_gates(
  id VARCHAR PRIMARY KEY,
  contribution_id VARCHAR NOT NULL REFERENCES contributions (id) on delete cascade,
  gate_id VARCHAR NOT NULL,
  transaction_hash VARCHAR NOT NULL
)
