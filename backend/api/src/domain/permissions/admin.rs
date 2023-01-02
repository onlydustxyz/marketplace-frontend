use domain::ProjectId;

use super::Permissions;

pub(super) struct Admin;

impl Permissions for Admin {
	fn can_spend_budget_of_project(&self, _project_id: &ProjectId) -> bool {
		false
	}

	fn can_unassign_project_leader(
		&self,
		_project_id: &ProjectId,
		_user_id: &domain::UserId,
	) -> bool {
		true
	}
}
