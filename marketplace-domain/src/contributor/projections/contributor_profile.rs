use crate::{ContributorAccountAddress, GithubUserId, Projection};

#[derive(Debug, PartialEq, Eq, Clone, Default)]
pub struct ContributorProfile {
	pub id: ContributorAccountAddress,
	pub github_identifier: GithubUserId,
	pub github_username: String,
	pub account: ContributorAccountAddress,
}

impl Projection for ContributorProfile {
	type A = crate::Contributor;
}
