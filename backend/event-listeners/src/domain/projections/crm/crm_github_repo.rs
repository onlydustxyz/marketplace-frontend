use ::infrastructure::database::schema::*;
use chrono::NaiveDateTime;
use derive_getters::{Dissolve, Getters};
use derive_more::Constructor;
use domain::GithubRepositoryId;
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
	id: GithubRepositoryId,
	owner: String,
	name: String,
	updated_at: Option<NaiveDateTime>,
}

impl domain::Entity for CrmGithubRepo {
	type Id = GithubRepositoryId;
}
