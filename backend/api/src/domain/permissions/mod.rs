use std::collections::HashSet;

use domain::{AggregateRepository, GithubUserId, Payment, PaymentId, ProjectId, UserId};

mod admin;
mod anonymous;
mod identified;

pub trait Permissions: Send + Sync {
	fn can_spend_budget_of_project(&self, project_id: &ProjectId) -> bool;
	fn can_cancel_payments_of_project(&self, project_id: &ProjectId) -> bool;
	fn can_create_github_issue_for_project(&self, project_id: &ProjectId) -> bool;
	fn can_ignore_issue_for_project(&self, project_id: &ProjectId) -> bool;
	fn can_unassign_project_leader(&self, project_id: &ProjectId, user_id: &UserId) -> bool;
	fn can_mark_invoice_as_received_for_payment(&self, payment_id: &PaymentId) -> bool;
}

pub trait IntoPermission {
	fn to_permissions(
		&self,
		payment_repository: AggregateRepository<Payment>,
	) -> Box<dyn Permissions>;
}

pub fn of_admin() -> Box<dyn Permissions> {
	Box::new(admin::Admin)
}

pub fn of_identified_user(
	projects: HashSet<ProjectId>,
	github_user_id: GithubUserId,
	payment_repository: AggregateRepository<Payment>,
) -> Box<dyn Permissions> {
	Box::new(identified::IdentifiedUser::new(
		projects,
		github_user_id,
		payment_repository,
	))
}

pub fn of_anonymous() -> Box<dyn Permissions> {
	Box::new(anonymous::Anonymous)
}
