use crate::{ContributorAccountAddress, GithubUserId, Projection};

#[derive(Debug, PartialEq, Eq, Clone, Default)]
pub struct ContributorProfile {
	pub id: ContributorAccountAddress,
	pub github_identifier: Option<GithubUserId>,
	pub github_username: Option<String>,
	pub account: ContributorAccountAddress,
	pub discord_handle: Option<String>,
}

impl Projection for ContributorProfile {
	type A = crate::Contributor;
}
