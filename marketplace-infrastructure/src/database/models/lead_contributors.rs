use crate::database::schema::*;
use rocket::serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Queryable, Debug, Serialize, Deserialize, Insertable)]
#[serde(crate = "rocket::serde")]
pub struct ProjectLead {
	pub project_id: Uuid,
	pub user_id: Uuid,
}
