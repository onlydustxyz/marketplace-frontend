use chrono::{NaiveDateTime, Utc};
use diesel::{Identifiable, Queryable};
use infrastructure::database::{enums::Currency, schema::crypto_usd_quotes};
use rust_decimal::Decimal;
use serde::{Deserialize, Serialize};

#[derive(
	Debug, Clone, Insertable, Identifiable, Serialize, Deserialize, AsChangeset, Queryable, Model,
)]
#[diesel(primary_key(currency))]
pub struct CryptoUsdQuote {
	pub currency: Currency,
	pub price: Decimal,
	pub updated_at: NaiveDateTime,
}

impl CryptoUsdQuote {
	pub fn new(currency: Currency, price: Decimal) -> Self {
		Self {
			currency,
			price,
			updated_at: Utc::now().naive_utc(),
		}
	}
}

impl Identifiable for CryptoUsdQuote {
	type Id = Currency;

	fn id(self) -> Self::Id {
		self.currency
	}
}
