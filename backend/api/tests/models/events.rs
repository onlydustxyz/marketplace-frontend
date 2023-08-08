use chrono::NaiveDateTime;
use domain::CommandId;
use infrastructure::database::schema::events;
use serde::{Deserialize, Serialize};
use serde_json::Value;

#[derive(Debug, Serialize, Deserialize, Insertable)]
pub struct Event {
	pub timestamp: NaiveDateTime,
	pub aggregate_name: String,
	pub aggregate_id: String,
	pub payload: Value,
	pub metadata: Value,
	pub command_id: Option<CommandId>,
}
