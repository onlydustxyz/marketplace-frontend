use derive_getters::Getters;
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize, Getters)]
pub struct Amount {
	minor: i64,
	currency: Currency,
}

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub enum Currency {
	Crypto(String),
}

impl Amount {
	pub fn new(minor: i64, currency: Currency) -> Self {
		Self { minor, currency }
	}
}

impl ToString for Currency {
	fn to_string(&self) -> String {
		match self {
			Self::Crypto(currency) => currency.clone(),
		}
	}
}
