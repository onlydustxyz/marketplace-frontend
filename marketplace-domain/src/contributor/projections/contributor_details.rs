use crate::{ContributorAccount, ContributorId, GithubUserId, Projection};

#[derive(Debug, PartialEq, Eq, Clone, Default)]
pub struct ContributorDetails {
	pub id: ContributorId,
	pub github_identifier: GithubUserId,
	pub github_username: String,
	pub account: ContributorAccount,
}

impl Projection for ContributorDetails {
	type A = crate::Contributor;
}
