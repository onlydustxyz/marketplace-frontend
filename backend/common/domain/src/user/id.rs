use std::str::FromStr;

use derive_more::{AsRef, Display, From, Into};
use diesel_derive_newtype::DieselNewType;
use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(
	Debug,
	Clone,
	Copy,
	Default,
	Serialize,
	Deserialize,
	PartialEq,
	Eq,
	Hash,
	Display,
	From,
	Into,
	AsRef,
	DieselNewType,
)]
pub struct Id(Uuid);

impl FromStr for Id {
	type Err = <Uuid as FromStr>::Err;

	fn from_str(s: &str) -> Result<Self, Self::Err> {
		Uuid::from_str(s).map(Into::into)
	}
}
