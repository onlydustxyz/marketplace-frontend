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
#[table_name = "crm_github_repos"]
#[primary_key(id)]
pub struct CrmGithubRepo {
	id: GithubRepoId,
	owner: String,
	name: String,
	updated_at: Option<NaiveDateTime>,
	description: String,
	stars: i32,
	fork_count: i32,
	html_url: String,
}

impl domain::Entity for CrmGithubRepo {
	type Id = GithubRepoId;
}
