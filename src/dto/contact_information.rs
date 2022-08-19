use schemars::JsonSchema;
use serde::{Deserialize, Serialize};

use crate::domain;

#[derive(Serialize, Deserialize, JsonSchema)]
pub struct ContactInformation {
	pub id: String,
	pub contributor_id: String,
	pub discord_handle: Option<String>,
}

impl From<domain::ContactInformation> for ContactInformation {
	fn from(contact_information: domain::ContactInformation) -> Self {
		Self {
			id: contact_information.id.to_string(),
			contributor_id: contact_information.contributor_id.to_string(),
			discord_handle: contact_information.discord_handle,
		}
	}
}
