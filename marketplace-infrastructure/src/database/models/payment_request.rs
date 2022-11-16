use crate::database::schema::*;
use rocket::serde::{Deserialize, Serialize};
use serde_json::Value;
use uuid::Uuid;

#[derive(Queryable, Debug, Serialize, Deserialize, Insertable)]
#[serde(crate = "rocket::serde")]
pub struct PaymentRequest {
	pub id: Uuid,
	pub project_id: Uuid,
	pub requestor_id: Uuid,
	pub recipient_id: Uuid,
	pub amount_in_usd: i64,
	pub reason: Value,
}
