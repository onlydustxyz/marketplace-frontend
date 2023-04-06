DELETE FROM events WHERE aggregate_id = :'id';
DELETE FROM budgets WHERE project_id = :'id';
DELETE FROM pending_project_leader_invitations where project_id = :'id';
DELETE FROM project_github_repos where project_id = :'id';
DELETE FROM project_leads where project_id = :'id';
DELETE FROM projects_sponsors where project_id = :'id';
DELETE FROM project_details where project_id = :'id';
DELETE FROM projects where id = :'id';
