use ::infrastructure::database::schema::*;
use chrono::NaiveDateTime;
use derive_getters::{Dissolve, Getters};
use derive_more::Constructor;
use domain::GithubUserId;
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
#[table_name = "github_user_indexes"]
#[primary_key(user_id)]
pub struct GithubUserIndex {
	user_id: GithubUserId,
	last_indexed_time: Option<NaiveDateTime>,
	is_registered: bool,
}

impl domain::Entity for GithubUserIndex {
	type Id = GithubUserId;
}
