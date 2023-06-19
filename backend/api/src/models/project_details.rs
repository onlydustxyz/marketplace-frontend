use derive_setters::Setters;
use diesel::Identifiable;
use domain::ProjectId;
use infrastructure::database::{enums::ProjectVisibility, schema::project_details};
use serde::{Deserialize, Serialize};

#[derive(
	Debug,
	Clone,
	Setters,
	Insertable,
	Serialize,
	Deserialize,
	Queryable,
	AsChangeset,
	Identifiable,
	PartialEq,
	Eq,
	Model,
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

impl Identifiable for ProjectDetails {
	type Id = ProjectId;

	fn id(self) -> Self::Id {
		self.project_id
	}
}
