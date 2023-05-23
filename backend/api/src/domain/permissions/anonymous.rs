use domain::{PaymentId, ProjectId};

/// Provides permissions for anonymous users.
pub(super) struct Anonymous;

impl Permissions for Anonymous {
	/// Anonymous users cannot spend budget of project.
	fn can_spend_budget_of_project(&self, _project_id: &ProjectId) -> bool {
		false
	}

	/// Anonymous users cannot create GitHub issue for project.
	fn can_create_github_issue_for_project(&self, _project_id: &ProjectId) -> bool {
		false
	}

	/// Anonymous users cannot ignore issue for project.
	fn can_ignore_issue_for_project(&self, _project_id: &ProjectId) -> bool {
		false
	}

	/// Anonymous users cannot unassign project leader.
	fn can_unassign_project_leader(
		&self,
		_project_id: &ProjectId,
		_user_id: &domain::UserId,
	) -> bool {
		false
	}

	/// Anonymous users cannot mark invoice as received for payment.
	fn can_mark_invoice_as_received_for_payment(
		&self,
		_project_id: &ProjectId,
		_payment_id: &PaymentId,
	) -> bool {
		false
	}
}