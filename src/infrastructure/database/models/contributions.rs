use super::Project;
use crate::infrastructure::database::schema::*;
use rocket::serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(
	Queryable,
	Identifiable,
	Insertable,
	Associations,
	AsChangeset,
	Debug,
	Serialize,
	Deserialize,
	Clone,
)]
#[belongs_to(Project)]
#[serde(crate = "rocket::serde")]
pub struct Contribution {
	pub onchain_id: String,
	pub project_id: String,
	pub status: String,
	pub transaction_hash: Option<String>,
	pub contributor_id: String,
	pub gate: i16,
	pub title: Option<String>,
	pub description: Option<String>,
	pub external_link: Option<String>,
	pub difficulty: Option<String>,
	pub technology: Option<String>,
	pub duration: Option<String>,
	pub context: Option<String>,
	pub type_: Option<String>,
	pub validator: String,
	pub id: Uuid,
}
