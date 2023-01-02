use std::collections::HashSet;

use domain::{ProjectId, UserId};

mod admin;
mod anonymous;
mod identified;

pub trait Permissions: Send + Sync {
	fn can_spend_budget_of_project(&self, project_id: &ProjectId) -> bool;
	fn can_unassign_project_leader(&self, project_id: &ProjectId, user_id: &UserId) -> bool;
}

pub fn of_admin() -> Box<dyn Permissions> {
	Box::new(admin::Admin)
}

pub fn of_identified_user(projects: HashSet<ProjectId>) -> Box<dyn Permissions> {
	Box::new(identified::IdentifiedUser::new(projects))
}

pub fn of_anonymous() -> Box<dyn Permissions> {
	Box::new(anonymous::Anonymous)
}
