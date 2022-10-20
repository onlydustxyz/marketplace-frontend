use crate::database::schema::*;
use rocket::serde::{Deserialize, Serialize};

#[derive(Queryable, Debug, Serialize, Deserialize)]
#[serde(crate = "rocket::serde")]
pub struct Contributor {
	pub account: String,
	pub github_identifier: Option<String>,
	pub github_username: Option<String>,
	pub discord_handle: Option<String>,
}

#[derive(Debug, Serialize, Deserialize, Insertable, AsChangeset)]
#[serde(crate = "rocket::serde")]
#[table_name = "contributors"]
pub struct NewGithubContributor {
	pub account: String,
	pub github_identifier: String,
	pub github_username: String,
}

#[derive(Debug, Serialize, Deserialize, Insertable, AsChangeset)]
#[serde(crate = "rocket::serde")]
#[table_name = "contributors"]
pub struct NewDiscordContributor {
	pub account: String,
	pub discord_handle: String,
}
