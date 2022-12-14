use domain::{BudgetId, ProjectId};

use super::Permissions;

pub(super) struct Admin;

impl Permissions for Admin {
	fn is_leader_on_project(&self, _project_id: &ProjectId) -> bool {
		true
	}

	fn can_spend_budget(&self, _budget_id: &BudgetId) -> bool {
		true
	}
}
