use ::infrastructure::database::schema::*;
use chrono::NaiveDateTime;
use derive_getters::{Dissolve, Getters};
use derive_more::Constructor;
use domain::GithubRepoId;
use serde::{Deserialize, Serialize};

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
#[table_name = "github_repo_indexes"]
#[primary_key(repo_id)]
pub struct GithubRepoIndex {
	repo_id: GithubRepoId,
	last_indexed_time: Option<NaiveDateTime>,
}

impl domain::Entity for GithubRepoIndex {
	type Id = GithubRepoId;
}
