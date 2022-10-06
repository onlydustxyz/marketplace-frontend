use crate::{ContributorAccount, GithubUserId, Projection};

#[derive(Debug, PartialEq, Eq, Clone, Default)]
pub struct ContributorProfile {
	pub id: ContributorAccount,
	pub github_identifier: GithubUserId,
	pub github_username: String,
	pub account: ContributorAccount,
}

impl Projection for ContributorProfile {
	type A = crate::Contributor;
}
