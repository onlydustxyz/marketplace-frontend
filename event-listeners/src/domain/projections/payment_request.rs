use super::Projection;
use domain::Entity;
use infrastructure::database::schema::payment_requests;
use serde_json::Value;
use uuid::Uuid;

#[derive(Debug, Insertable, Identifiable, AsChangeset, new)]
pub struct PaymentRequest {
	id: Uuid,
	project_id: Uuid,
	requestor_id: Uuid,
	recipient_id: Uuid,
	amount_in_usd: i64,
	reason: Value,
}

impl Entity for PaymentRequest {
	type Id = Uuid;
}

impl Projection for PaymentRequest {}
