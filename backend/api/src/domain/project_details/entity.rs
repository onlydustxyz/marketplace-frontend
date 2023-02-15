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
	description: Option<String>,
	telegram_link: Option<String>,
	logo_url: Option<String>,
	name: String,
}

impl ProjectDetails {
	pub fn new(
		project_id: ProjectId,
		name: String,
		description: Option<String>,
		telegram_link: Option<String>,
		logo_url: Option<String>,
	) -> Self {
		Self {
			project_id,
			description,
			telegram_link,
			logo_url,
			name,
		}
	}
}
