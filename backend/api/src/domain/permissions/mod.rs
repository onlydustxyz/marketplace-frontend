use std::collections::HashSet;

use domain::{BudgetId, ProjectId};

mod admin;
mod anonymous;
mod identified;

pub trait Permissions: Send + Sync {
	fn is_leader_on_project(&self, project_id: &ProjectId) -> bool;
	fn can_spend_budget(&self, budget_id: &BudgetId) -> bool;
}

pub fn of_admin() -> Box<dyn Permissions> {
	Box::new(admin::Admin)
}

pub fn of_identified_user(
	projects: HashSet<ProjectId>,
	budgets: HashSet<BudgetId>,
) -> Box<dyn Permissions> {
	Box::new(identified::IdentifiedUser::new(projects, budgets))
}

pub fn of_anonymous() -> Box<dyn Permissions> {
	Box::new(anonymous::Anonymous)
}
