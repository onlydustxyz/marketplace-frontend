mod id;

use derive_setters::Setters;
use diesel::Identifiable;
use infrastructure::database::schema::sponsors;
use serde::{Deserialize, Serialize};

pub use self::id::Id;

#[derive(
	Default,
	Debug,
	Clone,
	Setters,
	Insertable,
	AsChangeset,
	Serialize,
	Deserialize,
	Queryable,
	Identifiable,
	PartialEq,
	Eq,
	Model,
)]
#[diesel(table_name = sponsors, treat_none_as_null = true)]
#[setters(prefix = "with_")]
pub struct Sponsor {
	pub id: Id,
	pub name: String,
	pub logo_url: String,
	pub url: Option<String>,
}

impl Identifiable for Sponsor {
	type Id = Id;

	fn id(self) -> Self::Id {
		self.id
	}
}
