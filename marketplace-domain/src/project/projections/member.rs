use crate::{ContributorAccountAddress, GithubProjectId, ProjectAggregate, Projection};

#[derive(Debug, Clone, PartialEq, Eq, Default)]
pub struct Member {
	project_id: GithubProjectId,
	contributor_account: ContributorAccountAddress,
}

impl Projection for Member {
	type A = ProjectAggregate;
}

impl Member {
	pub fn new(
		project_id: GithubProjectId,
		contributor_account: ContributorAccountAddress,
	) -> Self {
		Self {
			project_id,
			contributor_account,
		}
	}

	pub fn project_id(&self) -> &GithubProjectId {
		&self.project_id
	}

	pub fn contributor_account(&self) -> &ContributorAccountAddress {
		&self.contributor_account
	}
}
