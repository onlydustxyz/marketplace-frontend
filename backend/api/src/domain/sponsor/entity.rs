use ::infrastructure::database::schema::sponsors;
use derive_getters::{Dissolve, Getters};
use derive_more::Constructor;
use serde::{Deserialize, Serialize};

use crate::domain::SponsorId;

#[derive(
	Default,
	Debug,
	Clone,
	Getters,
	Dissolve,
	Insertable,
	Serialize,
	Deserialize,
	Queryable,
	Identifiable,
	Constructor,
)]
#[table_name = "sponsors"]
pub struct Sponsor {
	id: SponsorId,
}

impl domain::Entity for Sponsor {
	type Id = SponsorId;
}
