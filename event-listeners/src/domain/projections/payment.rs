use super::Projection;
use domain::Entity;
use infrastructure::database::schema::payments;
use rust_decimal::Decimal;
use serde_json::Value;
use uuid::Uuid;

#[derive(Debug, Insertable, Identifiable, AsChangeset)]
pub struct Payment {
	id: Uuid,
	amount: Decimal,
	currency_code: String,
	receipt: Value,
	request_id: Uuid,
}

impl Payment {
	pub fn new(
		id: Uuid,
		amount: Decimal,
		currency_code: String,
		receipt: Value,
		request_id: Uuid,
	) -> Self {
		Self {
			id,
			amount,
			currency_code,
			receipt,
			request_id,
		}
	}
}

impl Entity for Payment {
	type Id = Uuid;
}

impl Projection for Payment {}
