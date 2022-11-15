use crate::database::schema::*;
use rocket::serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Queryable, Debug, Serialize, Deserialize, Insertable)]
#[serde(crate = "rocket::serde")]
pub struct Project {
	pub id: Uuid,
	pub name: String,
}
