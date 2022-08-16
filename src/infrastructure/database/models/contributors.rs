use crate::infrastructure::database::schema::*;
use rocket::serde::{Deserialize, Serialize};

#[derive(Identifiable, Queryable, Debug, Serialize, Deserialize, Clone)]
pub struct Contributor {
	pub id: String,
	pub discord_handle: Option<String>,
	pub github_handle: Option<String>,
	pub github_username: Option<String>,
}

#[derive(Insertable)]
#[table_name = "contributors"]
pub struct NewContributor {
	pub id: String,
	pub discord_handle: Option<String>,
	pub github_handle: Option<String>,
	pub github_username: Option<String>,
}
