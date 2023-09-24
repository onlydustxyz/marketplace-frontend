use serde::{Deserialize, Serialize};

use crate::models;

#[derive(Default, Debug, Clone, Serialize, Deserialize)]
pub struct Person {
	pub firstname: Option<String>,
	pub lastname: Option<String>,
}

impl From<Person> for models::PersonIdentity {
	fn from(person: Person) -> Self {
		Self {
			firstname: person.firstname,
			lastname: person.lastname,
		}
	}
}

impl From<Person> for models::Identity {
	fn from(person: Person) -> Self {
		Self::Person(person.into())
	}
}
