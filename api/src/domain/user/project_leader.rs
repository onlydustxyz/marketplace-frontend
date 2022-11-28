use super::User;
use domain::ProjectId;
use std::collections::HashSet;

#[derive(new)]
pub(super) struct ProjectLeader {
	projects: HashSet<ProjectId>,
}

impl User for ProjectLeader {
	fn is_leader_on_project(&self, project_id: &ProjectId) -> bool {
		self.projects.contains(project_id)
	}
}
