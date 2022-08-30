use schemars::JsonSchema;
use serde::{Deserialize, Serialize};

use marketplace_domain as domain;

#[derive(Serialize, JsonSchema, Deserialize, Clone, Debug, PartialEq, Eq)]
pub struct Application {
	pub id: String,
	pub contribution_id: String,
	pub contributor_id: String,
	pub status: String,
}

impl From<domain::ApplicationProjection> for Application {
	fn from(application: domain::ApplicationProjection) -> Self {
		Self {
			id: application.id().to_string(),
			contribution_id: application.contribution_id().to_string(),
			contributor_id: application.contributor_id().to_string(),
			status: application.status().to_string(),
		}
	}
}
