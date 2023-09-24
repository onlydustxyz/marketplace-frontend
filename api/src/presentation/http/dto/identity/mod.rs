use derive_more::From;
use serde::{Deserialize, Serialize};

mod person;
pub use person::Person;

mod company;
pub use company::Company;

mod location;
pub use location::Location;

#[derive(Debug, Default, Clone, Serialize, Deserialize, From)]
#[serde(rename_all = "camelCase")]
pub struct Identity {
	pub person: Option<Person>,
	pub company: Option<Company>,
}
