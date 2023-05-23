/// Contains the definition and implementation of the `ProjectDetails` struct, which represents the
/// details associated with a project.
use ::domain::ProjectId;
use ::infrastructure::database::schema::*;
use derive_getters::{Dissolve, Getters};
use derive_setters::Setters;
use serde::{Deserialize, Serialize};

/// Defines the `ProjectDetails` struct, which represents the details associated with a project.
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
	/// The unique identifier of the project.
	#[diesel(deserialize_as = "uuid::Uuid")]
	project_id: ProjectId,

	/// The Telegram group link associated with the project, if available.
	telegram_link: Option<String>,

	/// The URL of the project logo, if available.
	logo_url: Option<String>,

	/// The name of the project.
	name: String,

	/// A short description of the project.
	short_description: String,

	/// A detailed description of the project.
	long_description: String,
}

impl domain::Entity for ProjectDetails {
	type Id = ProjectId;
}

impl ProjectDetails {
	/// Creates a new `ProjectDetails` instance with the specified details.
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