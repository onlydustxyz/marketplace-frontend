use crate::database::schema::*;
use rocket::serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Identifiable, Eq, PartialEq, Insertable, Queryable, Debug, Serialize, Deserialize)]
#[serde(crate = "rocket::serde")]
#[diesel(primary_key(id))]
#[table_name = "users"]
pub struct Contributor {
	pub id: Uuid,
	pub github_identifier: Option<String>,
	pub github_username: Option<String>,
	pub discord_handle: Option<String>,
}

#[derive(Identifiable, Debug, Serialize, Deserialize, Insertable, AsChangeset)]
#[serde(crate = "rocket::serde")]
#[table_name = "users"]
pub struct NewGithubContributor {
	pub id: Uuid,
	pub github_identifier: String,
	pub github_username: String,
}

#[derive(Identifiable, Debug, Serialize, Deserialize, Insertable, AsChangeset)]
#[serde(crate = "rocket::serde")]
#[table_name = "users"]
pub struct NewDiscordContributor {
	pub id: Uuid,
	pub discord_handle: String,
}
