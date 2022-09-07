use crate::{ContributorId, GithubProjectId, Projection};

#[derive(Debug, Clone, PartialEq, Eq, Default)]
pub struct Member {
	project_id: GithubProjectId,
	contributor_id: ContributorId,
	is_lead_contributor: bool,
}

impl Projection for Member {}

impl Member {
	pub fn new(
		project_id: GithubProjectId,
		contributor_id: ContributorId,
		is_lead_contributor: bool,
	) -> Self {
		Self {
			project_id,
			contributor_id,
			is_lead_contributor,
		}
	}

	pub fn project_id(&self) -> &GithubProjectId {
		&self.project_id
	}

	pub fn contributor_id(&self) -> &ContributorId {
		&self.contributor_id
	}

	pub fn is_lead_contributor(&self) -> bool {
		self.is_lead_contributor
	}
}
