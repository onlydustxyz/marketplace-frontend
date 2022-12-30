use std::collections::HashSet;

use domain::{BudgetId, ProjectId, UserId};

mod admin;
mod anonymous;
mod identified;

pub trait Permissions: Send + Sync {
	fn can_spend_budget(&self, budget_id: &BudgetId) -> bool;
	fn can_unassign_project_leader(&self, project_id: &ProjectId, user_id: &UserId) -> bool;
}

pub fn of_admin() -> Box<dyn Permissions> {
	Box::new(admin::Admin)
}

pub fn of_identified_user(budgets: HashSet<BudgetId>) -> Box<dyn Permissions> {
	Box::new(identified::IdentifiedUser::new(budgets))
}

pub fn of_anonymous() -> Box<dyn Permissions> {
	Box::new(anonymous::Anonymous)
}
