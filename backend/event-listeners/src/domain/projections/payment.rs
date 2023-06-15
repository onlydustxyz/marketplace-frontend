use chrono::NaiveDateTime;
use derive_more::Constructor;
use domain::{PaymentId, PaymentReceiptId};
use infrastructure::database::schema::payments;
use rust_decimal::Decimal;
use serde_json::Value;

#[derive(Debug, Insertable, Identifiable, Queryable, AsChangeset, Constructor)]
pub struct Payment {
	id: PaymentReceiptId,
	amount: Decimal,
	currency_code: String,
	receipt: Value,
	request_id: PaymentId,
	processed_at: NaiveDateTime,
}

impl domain::Entity for Payment {
	type Id = PaymentReceiptId;
}
