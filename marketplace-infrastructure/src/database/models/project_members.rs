use crate::database::schema::*;
use rocket::serde::{Deserialize, Serialize};

#[derive(Queryable, Debug, Serialize, Deserialize, Insertable)]
#[serde(crate = "rocket::serde")]
pub struct ProjectMember {
	pub project_id: String,
	pub contributor_id: String,
	pub is_lead_contributor: bool,
}
