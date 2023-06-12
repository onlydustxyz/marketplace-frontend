use derive_more::{AsRef, Display, From, Into};
use diesel_derive_newtype::DieselNewType;
use juniper::GraphQLScalarValue;
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
	Display,
	From,
	Into,
	AsRef,
	Hash,
	DieselNewType,
	GraphQLScalarValue,
)]
pub struct Id(Uuid);

impl Id {
	pub fn new() -> Self {
		Self(Uuid::new_v4())
	}
}
