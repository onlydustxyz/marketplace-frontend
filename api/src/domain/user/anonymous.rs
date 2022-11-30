use super::User;
use domain::{BudgetId, ProjectId};

pub(super) struct Anonymous;

impl User for Anonymous {
	fn is_leader_on_project(&self, _project_id: &ProjectId) -> bool {
		false
	}

	fn can_spend_budget(&self, _budget_id: &BudgetId) -> bool {
		false
	}
}
