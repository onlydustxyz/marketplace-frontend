use derive_getters::Getters;
use derive_more::Display;
use rust_decimal::Decimal;
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize, Getters)]
pub struct Amount {
	amount: Decimal,
	currency: Currency,
}

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize, Display)]
pub enum Currency {
	Crypto(String),
}

impl Amount {
	pub fn new(amount: Decimal, currency: Currency) -> Self {
		Self { amount, currency }
	}
}
