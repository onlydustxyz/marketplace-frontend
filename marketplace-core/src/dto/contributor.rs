use schemars::JsonSchema;
use serde::{Deserialize, Serialize};

use marketplace_domain as domain;

#[derive(Serialize, JsonSchema, Deserialize, Clone, Debug, PartialEq, Eq)]
pub struct Contributor {
	pub id: String,
	pub github_identifier: Option<String>,
	pub github_username: Option<String>,
	pub account: String,
}

impl From<domain::ContributorProfile> for Contributor {
	fn from(contributor: domain::ContributorProfile) -> Self {
		Self {
			id: contributor.id.to_string(),
			github_identifier: contributor.github_identifier.map(|id| id.to_string()),
			github_username: contributor.github_username,
			account: contributor.account.to_string(),
		}
	}
}
