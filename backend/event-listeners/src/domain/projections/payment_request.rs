use super::Projection;
use derive_more::Constructor;
use domain::Entity;
use infrastructure::database::schema::payment_requests;
use serde_json::Value;
use uuid::Uuid;

#[derive(Debug, Insertable, Identifiable, Queryable, AsChangeset, Constructor)]
pub struct PaymentRequest {
	id: Uuid,
	budget_id: Uuid,
	requestor_id: Uuid,
	recipient_id: i64,
	amount_in_usd: i64,
	reason: Value,
}

impl Entity for PaymentRequest {
	type Id = Uuid;
}

impl Projection for PaymentRequest {}
