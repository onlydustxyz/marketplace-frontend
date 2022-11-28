use domain::ProjectId;
use std::collections::HashSet;

mod admin;
mod project_leader;
mod public;

pub trait User: Send + Sync {
	fn is_leader_on_project(&self, project_id: &ProjectId) -> bool;
}

pub fn admin() -> Box<dyn User> {
	Box::new(admin::Admin)
}

pub fn project_leader(projects: HashSet<ProjectId>) -> Box<dyn User> {
	Box::new(project_leader::ProjectLeader::new(projects))
}

pub fn public() -> Box<dyn User> {
	Box::new(public::Public)
}
