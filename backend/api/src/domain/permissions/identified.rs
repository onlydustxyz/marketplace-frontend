use std::collections::HashSet;

use derive_more::Constructor;
use domain::{BudgetId, ProjectId};

use super::Permissions;

#[derive(Constructor)]
pub(super) struct IdentifiedUser {
	budgets: HashSet<BudgetId>,
}

impl Permissions for IdentifiedUser {
	fn can_spend_budget(&self, budget_id: &BudgetId) -> bool {
		self.budgets.contains(budget_id)
	}

	fn can_unassign_project_leader(
		&self,
		_project_id: &ProjectId,
		_user_id: &domain::UserId,
	) -> bool {
		false
	}
}
