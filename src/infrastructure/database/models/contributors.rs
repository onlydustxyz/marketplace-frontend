use crate::infrastructure::database::schema::*;
use rocket::serde::{Deserialize, Serialize};

#[derive(
	Identifiable, Queryable, Debug, Serialize, Deserialize, Clone, Insertable, AsChangeset,
)]
#[table_name = "contributors"]
pub struct Contributor {
	pub id: String,
	pub discord_handle: Option<String>,
}
