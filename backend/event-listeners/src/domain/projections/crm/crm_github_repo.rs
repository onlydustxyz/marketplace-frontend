use ::infrastructure::database::schema::*;
use chrono::NaiveDateTime;
use domain::GithubRepoId;
use serde::{Deserialize, Serialize};

#[allow(clippy::too_many_arguments)]
#[derive(
	Default, Debug, Clone, Insertable, AsChangeset, Serialize, Deserialize, Queryable, Identifiable,
)]
#[table_name = "crm_github_repos"]
#[primary_key(id)]
pub struct CrmGithubRepo {
	pub id: GithubRepoId,
	pub owner: String,
	pub name: String,
	pub updated_at: Option<NaiveDateTime>,
	pub description: String,
	pub stars: i32,
	pub fork_count: i32,
	pub html_url: String,
	pub languages: serde_json::Value,
}

impl domain::Entity for CrmGithubRepo {
	type Id = GithubRepoId;
}
