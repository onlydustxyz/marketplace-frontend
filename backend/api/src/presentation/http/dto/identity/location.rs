use serde::{Deserialize, Serialize};

use crate::models;

#[derive(Default, Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Location {
	pub address: Option<String>,
	pub post_code: Option<String>,
	pub city: Option<String>,
	pub country: Option<String>,
}

impl From<Location> for models::Location {
	fn from(location: Location) -> Self {
		Self {
			address: location.address,
			post_code: location.post_code,
			city: location.city,
			country: location.country,
		}
	}
}
