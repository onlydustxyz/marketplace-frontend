use chrono::NaiveDateTime;
use diesel::Insertable;
use marketplace_infrastructure::database::schema::*;
use serde::{Deserialize, Serialize};
use serde_json::Value;

#[derive(Insertable, Debug, Serialize, Deserialize)]
pub struct Event {
	pub timestamp: NaiveDateTime,
	pub aggregate_name: String,
	pub aggregate_id: String,
	pub payload: Value,
	pub origin: String,
	pub metadata: Value,
}

#[derive(Insertable, Debug, Serialize, Deserialize)]
pub struct EventDeduplication {
	pub deduplication_id: String,
	pub event_index: i32,
}
