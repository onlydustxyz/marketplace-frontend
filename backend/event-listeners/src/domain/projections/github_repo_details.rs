use ::infrastructure::database::schema::*;
use derive_getters::{Dissolve, Getters};
use derive_more::Constructor;
use domain::GithubRepoId;
use serde::{Deserialize, Serialize};
use serde_json::Value;

#[derive(
	Default,
	Debug,
	Clone,
	Getters,
	Dissolve,
	Insertable,
	AsChangeset,
	Serialize,
	Deserialize,
	Queryable,
	Identifiable,
	Constructor,
)]
#[table_name = "github_repo_details"]
#[primary_key(id)]
pub struct GithubRepoDetails {
	id: GithubRepoId,
	languages: Value,
}

impl domain::Entity for GithubRepoDetails {
	type Id = GithubRepoId;
}
