use ::infrastructure::database::schema::*;
use chrono::NaiveDateTime;
use diesel::Identifiable;
use domain::GithubRepoId;
use serde::{Deserialize, Serialize};

#[derive(
	Debug, Clone, Insertable, AsChangeset, Serialize, Deserialize, Queryable, Identifiable, Model,
)]
pub struct GithubRepo {
	pub id: GithubRepoId,
	pub owner: String,
	pub name: String,
	pub updated_at: Option<NaiveDateTime>,
	pub description: String,
	pub stars: i32,
	pub fork_count: i32,
	pub html_url: String,
	pub languages: serde_json::Value,
	pub parent_id: Option<GithubRepoId>,
}

impl Identifiable for GithubRepo {
	type Id = GithubRepoId;

	fn id(self) -> Self::Id {
		self.id
	}
}
