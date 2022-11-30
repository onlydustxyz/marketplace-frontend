use domain::{BudgetId, ProjectId};
use std::collections::HashSet;

mod admin;
mod anonymous;
mod identified;

pub trait User: Send + Sync {
	fn is_leader_on_project(&self, project_id: &ProjectId) -> bool;
	fn can_spend_budget(&self, budget_id: &BudgetId) -> bool;
}

pub fn admin() -> Box<dyn User> {
	Box::new(admin::Admin)
}

pub fn identified_user(projects: HashSet<ProjectId>, budgets: HashSet<BudgetId>) -> Box<dyn User> {
	Box::new(identified::IdentifiedUser::new(projects, budgets))
}

pub fn anonymous() -> Box<dyn User> {
	Box::new(anonymous::Anonymous)
}
