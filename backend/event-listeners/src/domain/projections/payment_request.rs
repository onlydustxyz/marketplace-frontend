use chrono::NaiveDateTime;
use derive_getters::Getters;
use derive_more::Constructor;
use domain::{BudgetId, GithubUserId, PaymentId, UserId};
use infrastructure::database::schema::payment_requests;
use serde_json::Value;

#[derive(Debug, Insertable, Identifiable, Queryable, AsChangeset, Constructor, Getters)]
#[changeset_options(treat_none_as_null = "true")]
pub struct PaymentRequest {
	id: PaymentId,
	budget_id: BudgetId,
	requestor_id: UserId,
	recipient_id: GithubUserId,
	amount_in_usd: i64,
	reason: Value,
	requested_at: NaiveDateTime,
	pub invoice_received_at: Option<NaiveDateTime>,
}

impl domain::Entity for PaymentRequest {
	type Id = PaymentId;
}
