use std::collections::HashSet;

use derive_more::Constructor;
use domain::{BudgetId, ProjectId};

use super::Permissions;

#[derive(Constructor)]
pub(super) struct IdentifiedUser {
	projects: HashSet<ProjectId>,
	budgets: HashSet<BudgetId>,
}

impl Permissions for IdentifiedUser {
	fn is_leader_on_project(&self, project_id: &ProjectId) -> bool {
		self.projects.contains(project_id)
	}

	fn can_spend_budget(&self, budget_id: &BudgetId) -> bool {
		self.budgets.contains(budget_id)
	}
}
