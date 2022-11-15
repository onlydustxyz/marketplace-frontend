use uuid::Uuid;

use crate::{Project, ProjectId, Projection};

#[derive(Debug, Clone, PartialEq, Eq, Default)]
pub struct ProjectLead {
	project_id: ProjectId,
	user_id: Uuid,
}

impl Projection for ProjectLead {
	type A = Project;
}

impl ProjectLead {
	pub fn new(project_id: ProjectId, contributor_id: Uuid) -> Self {
		Self {
			project_id,
			user_id: contributor_id,
		}
	}

	pub fn project_id(&self) -> &ProjectId {
		&self.project_id
	}

	pub fn user_id(&self) -> &Uuid {
		&self.user_id
	}
}
