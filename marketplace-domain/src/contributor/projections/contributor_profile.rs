use uuid::Uuid;

use crate::{GithubUserId, Projection};

#[derive(Debug, PartialEq, Eq, Clone, Default)]
pub struct ContributorProfile {
	pub id: Uuid,
	pub github_identifier: Option<GithubUserId>,
	pub github_username: Option<String>,
	pub discord_handle: Option<String>,
}

impl Projection for ContributorProfile {
	type A = crate::Contributor;
}
