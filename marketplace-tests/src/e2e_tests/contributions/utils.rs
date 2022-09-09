use marketplace_core::dto::{Contribution, Project};

pub fn find_by_id(project: &Project, contribution_id: String) -> Option<Contribution> {
	project
		.contributions
		.iter()
		.find(|contribution| contribution.id == contribution_id)
		.cloned()
}
