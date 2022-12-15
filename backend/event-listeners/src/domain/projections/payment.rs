use derive_more::Constructor;
use domain::PaymentReceiptId;
use infrastructure::database::schema::payments;
use rust_decimal::Decimal;
use serde_json::Value;
use uuid::Uuid;

#[derive(Debug, Insertable, Identifiable, Queryable, AsChangeset, Constructor)]
pub struct Payment {
	id: PaymentReceiptId,
	amount: Decimal,
	currency_code: String,
	receipt: Value,
	request_id: Uuid,
}
