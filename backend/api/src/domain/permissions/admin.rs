/// Permissions for Admin user type.
use domain::{PaymentId, ProjectId};

pub(super) struct Admin;

/// Implements Permissions trait for Admin type.
impl Permissions for Admin {
	/// Determines if Admin can spend budget of a project.
	fn can_spend_budget_of_project(&self, _project_id: &ProjectId) -> bool {
		false
	}

	/// Determines if Admin can create a Github issue for a project.
	fn can_create_github_issue_for_project(&self, _project_id: &ProjectId) -> bool {
		true
	}

	/// Determines if Admin can ignore an issue for a project.
	fn can_ignore_issue_for_project(&self, _project_id: &ProjectId) -> bool {
		true
	}

	/// Determines if Admin can unassign the project leader for a project.
	fn can_unassign_project_leader(
		&self,
		_project_id: &ProjectId,
		_user_id: &domain::UserId,
	) -> bool {
		true
	}

	/// Determines if Admin can mark an invoice as received for a payment.
	fn can_mark_invoice_as_received_for_payment(
		&self,
		_project_id: &ProjectId,
		_payment_id: &PaymentId,
	) -> bool {
		true
	}
}