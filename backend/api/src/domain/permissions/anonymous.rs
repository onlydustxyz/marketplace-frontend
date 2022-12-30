use domain::{BudgetId, ProjectId};

use super::Permissions;

pub(super) struct Anonymous;

impl Permissions for Anonymous {
	fn can_spend_budget(&self, _budget_id: &BudgetId) -> bool {
		false
	}

	fn can_unassign_project_leader(
		&self,
		_project_id: &ProjectId,
		_user_id: &domain::UserId,
	) -> bool {
		false
	}
}
