use derive_getters::Getters;
use rust_decimal::Decimal;
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize, Getters)]
pub struct Amount {
	amount: Decimal,
	currency: Currency,
}

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub enum Currency {
	Crypto(String),
}

impl Amount {
	pub fn new(amount: Decimal, currency: Currency) -> Self {
		Self { amount, currency }
	}
}

impl ToString for Currency {
	fn to_string(&self) -> String {
		match self {
			Self::Crypto(currency) => currency.clone(),
		}
	}
}
