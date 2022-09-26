use crate::database::schema::*;
use chrono::NaiveDateTime;
use rocket::serde::{Deserialize, Serialize};
use serde_json::Value;

#[derive(Debug, Serialize, Deserialize)]
#[serde(crate = "rocket::serde")]
pub struct Event {
	pub aggregate_name: String,
	pub aggregate_id: String,
	pub payload: Value,
}

#[derive(Insertable, Debug, Serialize, Deserialize)]
#[table_name = "events"]
#[serde(crate = "rocket::serde")]
pub struct NewEvent {
	pub timestamp: NaiveDateTime,
	pub aggregate_name: String,
	pub aggregate_id: String,
	pub payload: Value,
	pub origin: String,
	pub metadata: Value,
}

#[derive(Insertable, Debug, Serialize, Deserialize)]
#[serde(crate = "rocket::serde")]
pub struct EventDeduplication {
	pub deduplication_id: String,
	pub event_index: i32,
}
