use chrono::NaiveDateTime;
use diesel::Identifiable;
use domain::{GithubUserId, PaymentId, ProjectId, UserId};
use infrastructure::database::{enums::Currency, schema::payment_requests};
use rust_decimal::Decimal;

#[derive(Debug, Insertable, Identifiable, Queryable, AsChangeset, Model)]
#[diesel(treat_none_as_null = true)]
pub struct PaymentRequest {
	pub id: PaymentId,
	pub requestor_id: UserId,
	pub recipient_id: GithubUserId,
	pub amount: Decimal,
	pub requested_at: NaiveDateTime,
	pub invoice_received_at: Option<NaiveDateTime>,
	pub hours_worked: i32,
	pub project_id: ProjectId,
	pub currency: Currency,
}

impl Identifiable for PaymentRequest {
	type Id = PaymentId;

	fn id(self) -> Self::Id {
		self.id
	}
}
