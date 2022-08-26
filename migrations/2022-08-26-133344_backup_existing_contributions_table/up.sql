ALTER TABLE contributions
RENAME TO contributions_backup;

CREATE TABLE contributions (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL REFERENCES projects (id) on delete cascade,
  issue_number TEXT NOT NULL,
  status TEXT NOT NULL,
  gate INT NOT NULL,
  contributor_id TEXT,
  title TEXT,
  description TEXT,
  external_link TEXT,
  difficulty TEXT,
  technology TEXT,
  duration TEXT,
  context TEXT,
  type TEXT
);

ALTER TABLE applications
RENAME CONSTRAINT unique_application TO unique_application_backup;

ALTER TABLE applications
RENAME TO applications_backup;

CREATE TABLE applications (
    id UUID PRIMARY KEY,
    contribution_id TEXT NOT NULL REFERENCES contributions(id),
    contributor_id TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    CONSTRAINT unique_application UNIQUE(contribution_id, contributor_id)
);
