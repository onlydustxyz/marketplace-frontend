use derive_more::{Display, From, FromStr, Into};
use diesel_derive_newtype::DieselNewType;
use juniper::GraphQLScalarValue;
use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(
	Debug,
	Default,
	Copy,
	Clone,
	PartialEq,
	Eq,
	Hash,
	Serialize,
	Deserialize,
	Display,
	From,
	Into,
	FromStr,
	DieselNewType,
	GraphQLScalarValue,
)]
pub struct Id(Uuid);

impl Id {
	pub fn new() -> Self {
		Self(Uuid::new_v4())
	}
}
