BEGIN TRANSACTION;

ALTER TABLE project_members
  DROP COLUMN contributor_account;

ALTER TABLE project_members
  ADD contributor_id UUID NOT NULL;

ALTER TABLE project_members
  ADD PRIMARY KEY (project_id, contributor_id);

ALTER TABLE pending_applications
  DROP COLUMN contributor_account_address;

ALTER TABLE pending_applications
  ADD contributor_id UUID NOT NULL;

ALTER TABLE pending_applications
  ADD PRIMARY KEY (contribution_id, contributor_id);

ALTER TABLE lead_contributors
  DROP COLUMN account;

ALTER TABLE lead_contributors
  ADD contributor_id UUID NOT NULL;

ALTER TABLE lead_contributors
  ADD PRIMARY KEY (project_id, contributor_id);

ALTER TABLE contributions
  DROP COLUMN contributor_account_address;

ALTER TABLE contributions
  ADD contributor_id UUID;

COMMIT TRANSACTION;
