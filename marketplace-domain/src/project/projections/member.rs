use crate::{ContributorAccount, GithubProjectId, Projection};

#[derive(Debug, Clone, PartialEq, Eq, Default)]
pub struct Member {
	project_id: GithubProjectId,
	contributor_account: ContributorAccount,
	is_lead_contributor: bool,
}

impl Projection for Member {}

impl Member {
	pub fn new(
		project_id: GithubProjectId,
		contributor_account: ContributorAccount,
		is_lead_contributor: bool,
	) -> Self {
		Self {
			project_id,
			contributor_account,
			is_lead_contributor,
		}
	}

	pub fn project_id(&self) -> &GithubProjectId {
		&self.project_id
	}

	pub fn contributor_account(&self) -> &ContributorAccount {
		&self.contributor_account
	}

	pub fn is_lead_contributor(&self) -> bool {
		self.is_lead_contributor
	}
}
