use chrono::NaiveDateTime;
use domain::{BudgetId, GithubUserId, PaymentId, UserId};
use infrastructure::database::schema::payment_requests;

#[derive(Debug, Insertable, Identifiable, Queryable, AsChangeset)]
#[diesel(treat_none_as_null = true)]
pub struct PaymentRequest {
	pub id: PaymentId,
	pub budget_id: BudgetId,
	pub requestor_id: UserId,
	pub recipient_id: GithubUserId,
	pub amount_in_usd: i64,
	pub requested_at: NaiveDateTime,
	pub invoice_received_at: Option<NaiveDateTime>,
	pub hours_worked: i32,
}

impl domain::Entity for PaymentRequest {
	type Id = PaymentId;
}
