DROP TABLE applications;

ALTER TABLE applications_backup
RENAME TO applications;

ALTER TABLE applications
RENAME CONSTRAINT unique_application_backup TO unique_application;

DROP TABLE contributions;

ALTER TABLE contributions_backup
RENAME TO contributions;
