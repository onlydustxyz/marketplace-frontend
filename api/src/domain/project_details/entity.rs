use ::domain::ProjectId;
use ::infrastructure::database::schema::*;
use derive_getters::{Dissolve, Getters};
use derive_more::Constructor;
use domain::Entity;
use serde::{Deserialize, Serialize};

use crate::domain::github::GithubRepositoryId;

#[derive(
	Default,
	Debug,
	Clone,
	PartialEq,
	Eq,
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
	#[diesel(deserialize_as = "i64")]
	github_repo_id: GithubRepositoryId,
	description: Option<String>,
	telegram_link: Option<String>,
}

impl Entity for ProjectDetails {
	type Id = ProjectId;
}
