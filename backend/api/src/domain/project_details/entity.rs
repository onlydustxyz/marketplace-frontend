use derive_getters::{Dissolve, Getters};
use derive_setters::Setters;
use domain::ProjectId;
use infrastructure::database::schema::*;
use serde::{Deserialize, Serialize};

use crate::domain::ProjectVisibility;

#[derive(
	Default,
	Debug,
	Clone,
	Getters,
	Setters,
	Dissolve,
	Insertable,
	Serialize,
	Deserialize,
	Queryable,
	AsChangeset,
	Identifiable,
	PartialEq,
)]
#[table_name = "project_details"]
#[primary_key(project_id)]
#[setters(prefix = "with_")]
#[changeset_options(treat_none_as_null = "true")]
pub struct ProjectDetails {
	#[diesel(deserialize_as = "uuid::Uuid")]
	pub project_id: ProjectId,
	pub telegram_link: Option<String>,
	pub logo_url: Option<String>,
	pub name: String,
	pub short_description: String,
	pub long_description: String,
	pub hiring: bool,
	pub rank: i32,
	pub visibility: ProjectVisibility,
}

impl domain::Entity for ProjectDetails {
	type Id = ProjectId;
}
