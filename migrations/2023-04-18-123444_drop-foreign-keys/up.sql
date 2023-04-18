ALTER TABLE project_leads DROP CONSTRAINT project_leads_project_id_fkey;
ALTER TABLE budgets DROP CONSTRAINT budgets_project_id_fkey;
ALTER TABLE payment_requests DROP CONSTRAINT payment_requests_budget_id_fkey;
ALTER TABLE payments DROP CONSTRAINT payments_request_id_fkey;

ALTER TABLE pending_project_leader_invitations
ADD CONSTRAINT pending_project_leader_invitations_project_id_fkey FOREIGN KEY (project_id)
REFERENCES projects (id);
