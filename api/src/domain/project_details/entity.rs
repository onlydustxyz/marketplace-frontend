use ::domain::ProjectId;
use ::infrastructure::database::schema::*;
use derive_getters::{Dissolve, Getters};
use derive_more::Constructor;
use domain::Entity;
use serde::{Deserialize, Serialize};

#[derive(
	Default,
	Debug,
	Clone,
	Constructor,
	Getters,
	Dissolve,
	Insertable,
	Serialize,
	Deserialize,
	Queryable,
	AsChangeset,
)]
#[table_name = "project_details"]
pub struct ProjectDetails {
	#[diesel(deserialize_as = "uuid::Uuid")]
	project_id: ProjectId,
	description: Option<String>,
	telegram_link: Option<String>,
}

impl Entity for ProjectDetails {
	type Id = ProjectId;
}
