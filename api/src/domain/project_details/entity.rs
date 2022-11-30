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
	AsChangeset,
)]
#[table_name = "project_details"]
pub struct ProjectDetails {
	project_id: ProjectId,
	github_repo_id: GithubRepositoryId,
	description: Option<String>,
	telegram_link: Option<String>,
}

impl Entity for ProjectDetails {
	type Id = ProjectId;
}
