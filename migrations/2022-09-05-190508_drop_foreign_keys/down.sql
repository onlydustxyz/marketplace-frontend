ALTER TABLE applications ADD CONSTRAINT applications_contribution_id_fkey1 FOREIGN KEY (contribution_id) REFERENCES contributions (id);
ALTER TABLE contributions ADD CONSTRAINT contributions_project_id_fkey1 FOREIGN KEY (project_id) REFERENCES projects (id);
