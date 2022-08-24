use crate::database::schema::*;
use rocket::serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(
	Identifiable, Queryable, Debug, Serialize, Deserialize, Clone, Insertable, AsChangeset,
)]
#[table_name = "contact_information"]
pub struct ContactInformation {
	pub id: Uuid,
	pub contributor_id: String,
	pub discord_handle: Option<String>,
}
