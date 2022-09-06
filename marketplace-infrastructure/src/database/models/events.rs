use crate::database::schema::*;
use rocket::serde::{Deserialize, Serialize};
use serde_json::Value;

#[derive(Insertable, Debug, Serialize, Deserialize)]
#[serde(crate = "rocket::serde")]
pub struct Event {
	pub aggregate_name: String,
	pub aggregate_id: String,
	pub payload: Value,
}

#[derive(Insertable, Debug, Serialize, Deserialize)]
#[serde(crate = "rocket::serde")]
pub struct EventDeduplication {
	pub deduplication_id: String,
	pub event_index: i32,
}
