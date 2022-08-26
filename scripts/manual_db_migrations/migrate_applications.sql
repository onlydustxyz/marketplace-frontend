INSERT INTO applications (id, contribution_id, contributor_id, "status")
SELECT
    applications_backup.id,
    contributions.id,
    applications_backup.contributor_id,
    applications_backup."status"
FROM applications_backup
JOIN contributions_backup ON contributions_backup.id = applications_backup.contribution_id
JOIN contributions ON contributions.project_id = contributions_backup.project_id AND contributions.external_link = contributions_backup.external_link;

SELECT
 (SELECT COUNT(*) FROM applications ) AS count_applications,
 (SELECT COUNT(*) FROM applications_backup ) AS count_applications_backup;
