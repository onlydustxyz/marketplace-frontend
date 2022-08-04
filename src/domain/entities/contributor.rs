use std::fmt::Display;

use schemars::{
	schema::{InstanceType, SchemaObject, StringValidation},
	JsonSchema,
};
use serde::{Deserialize, Serialize};

use crypto_bigint::U256;

#[derive(Copy, Clone, Debug, PartialEq, Eq, Serialize, Deserialize, Hash, Default)]
pub struct Id(pub U256);

#[derive(Clone, Debug, PartialEq, Eq)]
pub struct Contributor {
	pub id: Id,
	pub github_username: Option<String>,
	pub github_handle: Option<String>,
	pub discord_handle: Option<String>,
}

impl From<&str> for Id {
	fn from(s: &str) -> Self {
		Self(U256::from_be_hex(s))
	}
}

impl From<U256> for Id {
	fn from(v: U256) -> Self {
		Self(v)
	}
}

impl Display for Id {
	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
		Display::fmt(&self.0, f)
	}
}

impl From<u128> for Id {
	fn from(id: u128) -> Self {
		Self(U256::from_u128(id))
	}
}

impl JsonSchema for Id {
	fn schema_name() -> String {
		"ContributorId".to_string()
	}

	fn json_schema(_: &mut schemars::gen::SchemaGenerator) -> schemars::schema::Schema {
		let schema = SchemaObject {
			instance_type: Some(InstanceType::String.into()),
			string: Some(Box::new(StringValidation {
				min_length: Some(3),
				max_length: Some(66),
				pattern: Some("\\b0x[0-9a-f]+\\b".to_string()),
			})),
			..Default::default()
		};

		schema.into()
	}
}
