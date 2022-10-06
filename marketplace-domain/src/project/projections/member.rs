use crate::{ContributorAccountAddress, GithubProjectId, ProjectAggregate, Projection};

#[derive(Debug, Clone, PartialEq, Eq, Default)]
pub struct Member {
	project_id: GithubProjectId,
	contributor_account_address: ContributorAccountAddress,
}

impl Projection for Member {
	type A = ProjectAggregate;
}

impl Member {
	pub fn new(
		project_id: GithubProjectId,
		contributor_account_address: ContributorAccountAddress,
	) -> Self {
		Self {
			project_id,
			contributor_account_address,
		}
	}

	pub fn project_id(&self) -> &GithubProjectId {
		&self.project_id
	}

	pub fn contributor_account_address(&self) -> &ContributorAccountAddress {
		&self.contributor_account_address
	}
}
