use backend_infrastructure::database::schema::*;
use chrono::NaiveDateTime;
use diesel::Insertable;
use serde::{Deserialize, Serialize};
use serde_json::Value;
use uuid::Uuid;

#[derive(Insertable, Debug, Serialize, Deserialize)]
pub struct Event {
	pub timestamp: NaiveDateTime,
	pub aggregate_name: String,
	pub aggregate_id: String,
	pub payload: Value,
	pub metadata: Value,
	pub command_id: Option<Uuid>,
}

#[derive(Insertable, Debug, Serialize, Deserialize)]
pub struct EventDeduplication {
	pub deduplication_id: String,
	pub event_index: i32,
}
