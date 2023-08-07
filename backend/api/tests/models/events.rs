use chrono::NaiveDateTime;
use serde::{Deserialize, Serialize};
use serde_json::Value;
use infrastructure::database::schema::events;
use domain::CommandId;

#[derive(Debug, Serialize, Deserialize, Insertable)]
pub struct Event {
	pub timestamp: NaiveDateTime,
	pub aggregate_name: String,
	pub aggregate_id: String,
	pub payload: Value,
	pub metadata: Value,
	pub command_id: Option<CommandId>,
}
