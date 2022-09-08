use crate::database::schema::*;
use rocket::serde::{Deserialize, Serialize};
use std::time::SystemTime;

use super::Contribution;

#[derive(Identifiable, Queryable, Debug, Serialize, Deserialize, Insertable, AsChangeset)]
#[table_name = "projects"]
#[serde(crate = "rocket::serde")]
pub struct Project {
	pub id: String,
	pub owner: String,
	pub name: String,
	pub url: Option<String>,
	pub description: Option<String>,
	pub logo_url: Option<String>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct ProjectWithContributions {
	pub id: String,
	pub owner: String,
	pub name: String,
	pub last_indexed_time: Option<SystemTime>,
	pub contributions: Vec<Contribution>,
}
