use crate::database::schema::*;
use rocket::serde::{Deserialize, Serialize};

#[derive(Queryable, Debug, Serialize, Deserialize, Insertable)]
#[serde(crate = "rocket::serde")]
pub struct LeadContributor {
	pub project_id: String,
	pub account: String,
}
