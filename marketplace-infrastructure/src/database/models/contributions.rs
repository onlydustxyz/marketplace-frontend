use super::Project;
use crate::database::schema::*;
use rocket::serde::{Deserialize, Serialize};

#[derive(
	Queryable, Identifiable, Insertable, Associations, Debug, Serialize, Deserialize, Clone,
)]
#[belongs_to(Project)]
#[serde(crate = "rocket::serde")]
pub struct Contribution {
	pub id: String,
	pub project_id: String,
	pub status: String,
	pub gate: i32,
	pub contributor_id: Option<String>,
	pub title: Option<String>,
	pub description: Option<String>,
	pub external_link: Option<String>,
	pub difficulty: Option<String>,
	pub technology: Option<String>,
	pub duration: Option<String>,
	pub context: Option<String>,
	pub type_: Option<String>,
}
