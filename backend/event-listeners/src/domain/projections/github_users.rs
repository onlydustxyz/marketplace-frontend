use ::infrastructure::database::schema::*;
use derive_getters::Getters;
use derive_new::new;
use domain::GithubUserId;
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Insertable, AsChangeset, Serialize, Deserialize, new, Getters)]
pub struct GithubUser {
	id: GithubUserId,
	login: String,
	avatar_url: String,
	html_url: String,
}

impl domain::Entity for GithubUser {
	type Id = GithubUserId;
}
