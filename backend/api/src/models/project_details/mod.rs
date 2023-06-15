mod repository;

use derive_getters::{Dissolve, Getters};
use derive_setters::Setters;
use domain::ProjectId;
use infrastructure::database::{enums::ProjectVisibility, schema::project_details};
use serde::{Deserialize, Serialize};

#[cfg(test)]
pub use self::repository::MockRepository;
pub use self::repository::Repository;

#[derive(
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
#[diesel(table_name = project_details, primary_key(project_id), treat_none_as_null = true)]
#[setters(prefix = "with_")]
pub struct ProjectDetails {
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
