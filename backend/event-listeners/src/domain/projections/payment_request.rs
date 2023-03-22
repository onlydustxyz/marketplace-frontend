use chrono::NaiveDateTime;
use derive_getters::Getters;
use derive_new::new;
use domain::{BudgetId, GithubUserId, PaymentId, UserId};
use infrastructure::database::schema::payment_requests;

#[allow(clippy::too_many_arguments)]
#[derive(Debug, Insertable, Identifiable, Queryable, AsChangeset, new, Getters)]
#[changeset_options(treat_none_as_null = "true")]
pub struct PaymentRequest {
	id: PaymentId,
	budget_id: BudgetId,
	requestor_id: UserId,
	recipient_id: GithubUserId,
	amount_in_usd: i64,
	requested_at: NaiveDateTime,
	pub invoice_received_at: Option<NaiveDateTime>,
}

impl domain::Entity for PaymentRequest {
	type Id = PaymentId;
}
