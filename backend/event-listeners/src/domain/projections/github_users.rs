use ::infrastructure::database::schema::*;
use derive_getters::Getters;
use domain::GithubUserId;
use serde::{Deserialize, Serialize};

#[derive(
	Debug, Clone, Insertable, AsChangeset, Serialize, Deserialize, Getters, Default, PartialEq, Eq,
)]
pub struct GithubUser {
	pub id: GithubUserId,
	pub login: String,
	pub avatar_url: String,
	pub html_url: String,
	pub bio: Option<String>,
	pub location: Option<String>,
	pub website: Option<String>,
	pub twitter: Option<String>,
	pub linkedin: Option<String>,
	pub telegram: Option<String>,
}

impl domain::Entity for GithubUser {
	type Id = GithubUserId;
}
