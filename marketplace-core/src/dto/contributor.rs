use schemars::JsonSchema;
use serde::{Deserialize, Serialize};

use marketplace_domain as domain;

#[derive(Serialize, JsonSchema, Deserialize, Clone, Debug, PartialEq, Eq)]
pub struct Contributor {
	pub id: String,
	pub github_identifier: String,
	pub github_username: String,
	pub account: String,
}

impl From<domain::ContributorProjection> for Contributor {
	fn from(contributor: domain::ContributorProjection) -> Self {
		Self {
			id: contributor.id.to_string(),
			github_identifier: contributor.github_identifier.to_string(),
			github_username: contributor.github_username.to_string(),
			account: contributor.account.to_string(),
		}
	}
}
