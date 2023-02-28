use ::infrastructure::database::schema::sponsors;
use derive_getters::{Dissolve, Getters};
use derive_more::Constructor;
use derive_setters::Setters;
use serde::{Deserialize, Serialize};

use crate::domain::SponsorId;

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
#[table_name = "sponsors"]
#[setters(prefix = "with_")]
pub struct Sponsor {
	id: SponsorId,
	name: String,
	logo_url: String,
	url: Option<String>,
}

impl domain::Entity for Sponsor {
	type Id = SponsorId;
}
