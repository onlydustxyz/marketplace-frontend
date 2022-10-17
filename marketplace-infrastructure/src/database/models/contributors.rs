use crate::database::schema::*;
use rocket::serde::{Deserialize, Serialize};

#[derive(Queryable, Debug, Serialize, Deserialize, Identifiable)]
#[serde(crate = "rocket::serde")]
pub struct Contributor {
	pub id: String,
	pub account: String,
	pub github_identifier: Option<String>,
	pub github_username: Option<String>,
	pub discord_handle: Option<String>,
}

#[derive(Debug, Serialize, Deserialize, Insertable, Identifiable, AsChangeset)]
#[serde(crate = "rocket::serde")]
#[table_name = "contributors"]
pub struct NewGithubContributor {
	pub id: String,
	pub account: String,
	pub github_identifier: String,
	pub github_username: String,
}
