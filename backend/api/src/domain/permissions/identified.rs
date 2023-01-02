use std::collections::HashSet;

use derive_more::Constructor;
use domain::ProjectId;

use super::Permissions;

#[derive(Constructor)]
pub(super) struct IdentifiedUser {
	projects: HashSet<ProjectId>,
}

impl Permissions for IdentifiedUser {
	fn can_spend_budget_of_project(&self, project_id: &ProjectId) -> bool {
		self.projects.contains(project_id)
	}

	fn can_unassign_project_leader(
		&self,
		_project_id: &ProjectId,
		_user_id: &domain::UserId,
	) -> bool {
		false
	}
}
