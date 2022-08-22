use crate::infrastructure::database::schema::*;
use rocket::serde::{Deserialize, Serialize};
use serde_json::Value;
use uuid::Uuid;

#[derive(Insertable, Debug, Serialize, Deserialize)]
#[serde(crate = "rocket::serde")]
pub struct Event {
	pub aggregate_name: String,
	pub aggregate_id: Uuid,
	pub payload: Value,
}
