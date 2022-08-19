use schemars::JsonSchema;
use serde::{Deserialize, Serialize};

use marketplace_domain as domain;

#[derive(Serialize, JsonSchema, Deserialize, Clone, PartialEq, Eq, Debug)]
// #[cfg_attr(test, derive(PartialEq, Eq, Debug))]
pub struct Application {
	pub id: String,
	pub contribution_id: String,
	pub contributor_id: String,
	pub status: String,
}

impl From<domain::Application> for Application {
	fn from(application: domain::Application) -> Self {
		Self {
			id: application.id().to_string(),
			contribution_id: application.contribution_id().to_string(),
			contributor_id: application.contributor_id().to_string(),
			status: application.status().to_string(),
		}
	}
}
