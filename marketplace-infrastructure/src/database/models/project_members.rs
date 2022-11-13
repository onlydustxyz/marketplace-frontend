use crate::database::schema::*;
use rocket::serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Queryable, Debug, Serialize, Deserialize, Insertable)]
#[serde(crate = "rocket::serde")]
pub struct ProjectMember {
	pub project_id: String,
	pub contributor_id: Uuid,
}
