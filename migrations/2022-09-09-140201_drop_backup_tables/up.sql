ALTER TABLE IF EXISTS applications_backup DROP CONSTRAINT IF EXISTS applications_backup_contribution_id_fkey1;
ALTER TABLE IF EXISTS contributions_backup DROP CONSTRAINT IF EXISTS contributions_backup_project_id_fkey1;

DROP TABLE IF EXISTS applications_backup;
DROP TABLE IF EXISTS contributions_backup;
