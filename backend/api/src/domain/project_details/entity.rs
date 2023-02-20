use ::domain::ProjectId;
use ::infrastructure::database::schema::*;
use derive_getters::{Dissolve, Getters};
use serde::{Deserialize, Serialize};

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
	AsChangeset,
	Identifiable,
)]
#[table_name = "project_details"]
#[primary_key(project_id)]
pub struct ProjectDetails {
	#[diesel(deserialize_as = "uuid::Uuid")]
	project_id: ProjectId,
	telegram_link: Option<String>,
	logo_url: Option<String>,
	name: String,
	short_description: String,
	long_description: String,
}

impl domain::Entity for ProjectDetails {
	type Id = ProjectId;
}

impl ProjectDetails {
	pub fn new(
		project_id: ProjectId,
		name: String,
		telegram_link: Option<String>,
		logo_url: Option<String>,
		short_description: String,
		long_description: String,
	) -> Self {
		Self {
			project_id,
			telegram_link,
			logo_url,
			name,
			short_description,
			long_description,
		}
	}
}
