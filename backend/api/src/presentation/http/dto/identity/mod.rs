use derive_more::From;
use serde::{Deserialize, Serialize};

use crate::models;

mod person;
pub use person::Person;

mod company;
pub use company::Company;

mod location;
pub use location::Location;

#[derive(Debug, Clone, Serialize, Deserialize, From)]
#[serde(rename_all = "camelCase")]
pub struct Identity {
	r#type: Type,
	person: Option<Person>,
	company: Option<Company>,
}

impl TryFrom<Identity> for models::Identity {
	type Error = anyhow::Error;

	fn try_from(input: Identity) -> Result<Self, Self::Error> {
		match input.r#type {
			Type::Company => input
				.company
				.ok_or_else(|| {
					anyhow::anyhow!(
						"type was set to `COMPANY` without the matching `company` field being provided"
					)
				})
				.map(Into::into),
			Type::Person => input
				.person
				.ok_or_else(|| {
					anyhow::anyhow!(
						"type was set to `PERSON` without the matching `person` field being provided"
					)
				})
				.map(Into::into),
		}
	}
}

#[derive(Debug, Clone, Copy, Serialize, Deserialize)]
#[serde(rename_all = "SCREAMING_SNAKE_CASE")]
pub enum Type {
	Company,
	Person,
}
