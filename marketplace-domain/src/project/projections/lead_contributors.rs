use crate::{ContributorAccountAddress, GithubProjectId, ProjectAggregate, Projection};

#[derive(Debug, Clone, PartialEq, Eq, Default)]
pub struct LeadContributor {
	project_id: GithubProjectId,
	account: ContributorAccountAddress,
}

impl Projection for LeadContributor {
	type A = ProjectAggregate;
}

impl LeadContributor {
	pub fn new(project_id: GithubProjectId, account: ContributorAccountAddress) -> Self {
		Self {
			project_id,
			account,
		}
	}

	pub fn project_id(&self) -> &GithubProjectId {
		&self.project_id
	}

	pub fn account(&self) -> &ContributorAccountAddress {
		&self.account
	}
}
