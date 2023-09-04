use domain::{PaymentId, ProjectId};

use super::Permissions;

pub(super) struct Anonymous;

impl Permissions for Anonymous {
	fn can_spend_budget_of_project(&self, _project_id: &ProjectId) -> bool {
		false
	}

	fn can_cancel_payments_of_project(&self, _project_id: &ProjectId) -> bool {
		false
	}

	fn can_create_github_issue_for_project(&self, _project_id: &ProjectId) -> bool {
		false
	}

	fn can_ignore_issue_for_project(&self, _project_id: &ProjectId) -> bool {
		false
	}

	fn can_unassign_project_leader(
		&self,
		_project_id: &ProjectId,
		_user_id: &domain::UserId,
	) -> bool {
		false
	}

	fn can_mark_invoice_as_received_for_payment(
		&self,
		_project_id: &ProjectId,
		_payment_id: &PaymentId,
	) -> bool {
		false
	}
}
