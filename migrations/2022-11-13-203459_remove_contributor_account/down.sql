BEGIN TRANSACTION;

ALTER TABLE project_members
  DROP COLUMN contributor_id;

ALTER TABLE project_members
  ADD contributor_account TEXT NOT NULL;

ALTER TABLE project_members
  ADD PRIMARY KEY (project_id, contributor_account);

ALTER TABLE pending_applications
  DROP COLUMN contributor_id;

ALTER TABLE pending_applications
  ADD contributor_account_address TEXT NOT NULL;

ALTER TABLE pending_applications
  ADD PRIMARY KEY (contribution_id, contributor_account_address);

ALTER TABLE lead_contributors
  DROP COLUMN contributor_id;

ALTER TABLE lead_contributors
  ADD account TEXT NOT NULL;

ALTER TABLE lead_contributors
  ADD PRIMARY KEY (project_id, account);

ALTER TABLE contributions
  DROP COLUMN contributor_id;

ALTER TABLE contributions
  ADD contributor_account_address TEXT;

COMMIT TRANSACTION;
