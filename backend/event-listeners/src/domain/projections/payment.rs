use chrono::NaiveDateTime;
use domain::{PaymentId, PaymentReceiptId};
use infrastructure::database::schema::payments;
use rust_decimal::Decimal;
use serde_json::Value;

#[derive(Debug, Insertable, Identifiable, Queryable, AsChangeset)]
pub struct Payment {
	pub id: PaymentReceiptId,
	pub amount: Decimal,
	pub currency_code: String,
	pub receipt: Value,
	pub request_id: PaymentId,
	pub processed_at: NaiveDateTime,
}

impl domain::Entity for Payment {
	type Id = PaymentReceiptId;
}
