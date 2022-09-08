use crate::database::schema::*;
use rocket::serde::{Deserialize, Serialize};

#[derive(Queryable, Debug, Serialize, Deserialize, Insertable, Identifiable)]
#[serde(crate = "rocket::serde")]
pub struct Contributor {
	pub id: String,
	pub account: String,
	pub github_identifier: String,
	pub github_username: String,
}
