use uuid::Uuid;

use crate::{GithubProjectId, Project, Projection};

#[derive(Debug, Clone, PartialEq, Eq, Default)]
pub struct LeadContributor {
	project_id: GithubProjectId,
	contributor_id: Uuid,
}

impl Projection for LeadContributor {
	type A = Project;
}

impl LeadContributor {
	pub fn new(project_id: GithubProjectId, contributor_id: Uuid) -> Self {
		Self {
			project_id,
			contributor_id,
		}
	}

	pub fn project_id(&self) -> &GithubProjectId {
		&self.project_id
	}

	pub fn contributor_id(&self) -> &Uuid {
		&self.contributor_id
	}
}
