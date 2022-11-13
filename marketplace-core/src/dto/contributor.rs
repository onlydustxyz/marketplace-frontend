use schemars::JsonSchema;
use serde::{Deserialize, Serialize};

use marketplace_domain as domain;
use uuid::Uuid;

#[derive(Serialize, JsonSchema, Deserialize, Clone, Debug, PartialEq, Eq)]
pub struct Contributor {
	pub id: Uuid,
	pub github_identifier: Option<String>,
	pub github_username: Option<String>,
	pub discord_handle: Option<String>,
}

impl From<domain::ContributorProfile> for Contributor {
	fn from(contributor: domain::ContributorProfile) -> Self {
		Self {
			id: contributor.id,
			github_identifier: contributor.github_identifier.map(|id| id.to_string()),
			github_username: contributor.github_username,
			discord_handle: contributor.discord_handle,
		}
	}
}
