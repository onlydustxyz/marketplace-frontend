mod id;
mod repository;

use derive_getters::{Dissolve, Getters};
use derive_more::Constructor;
use derive_setters::Setters;
use infrastructure::database::schema::sponsors;
use serde::{Deserialize, Serialize};

#[cfg(test)]
pub use self::repository::MockRepository;
pub use self::{id::Id, repository::Repository};

#[derive(
	Default,
	Debug,
	Clone,
	Getters,
	Setters,
	Dissolve,
	Insertable,
	AsChangeset,
	Serialize,
	Deserialize,
	Queryable,
	Identifiable,
	Constructor,
	PartialEq,
)]
#[diesel(table_name = sponsors, treat_none_as_null = true)]
#[setters(prefix = "with_")]
pub struct Sponsor {
	id: Id,
	name: String,
	logo_url: String,
	url: Option<String>,
}

impl domain::Entity for Sponsor {
	type Id = Id;
}
