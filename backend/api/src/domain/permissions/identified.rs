use std::collections::HashSet;

use anyhow::Result;
use derive_more::Constructor;
use domain::{AggregateRepository, GithubUserId, Payment, PaymentId, PaymentStatus, ProjectId};

use super::Permissions;

#[derive(Constructor)]
pub(super) struct IdentifiedUser {
	projects: HashSet<ProjectId>,
	github_user_id: GithubUserId,
	payment_repository: AggregateRepository<Payment>,
}

impl Permissions for IdentifiedUser {
	fn can_spend_budget_of_project(&self, project_id: &ProjectId) -> bool {
		self.projects.contains(project_id)
	}

	fn can_cancel_payments_of_project(&self, project_id: &ProjectId) -> bool {
		self.projects.contains(project_id)
	}

	fn can_create_github_issue_for_project(&self, project_id: &ProjectId) -> bool {
		self.projects.contains(project_id)
	}

	fn can_ignore_issue_for_project(&self, project_id: &ProjectId) -> bool {
		println!("registered {:?}", self.projects);
		self.projects.contains(project_id)
	}

	fn can_unassign_project_leader(
		&self,
		_project_id: &ProjectId,
		_user_id: &domain::UserId,
	) -> bool {
		false
	}

	fn can_mark_invoice_as_received_for_payment(&self, payment_id: &PaymentId) -> bool {
		self.is_recipient_of_payment_request(payment_id).unwrap_or(false)
	}
}

impl IdentifiedUser {
	fn is_recipient_of_payment_request(&self, payment_id: &PaymentId) -> Result<bool> {
		let payment = self.payment_repository.find_by_id(payment_id)?;
		Ok(payment.status == PaymentStatus::Active && payment.recipient_id == self.github_user_id)
	}
}
