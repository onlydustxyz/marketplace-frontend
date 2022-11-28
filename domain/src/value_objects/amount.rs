use derive_getters::Getters;
use derive_more::Display;
use rust_decimal::Decimal;
use rusty_money::{FormattableCurrency, Money};
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

impl<'a, T: FormattableCurrency> From<Money<'a, T>> for Amount {
	fn from(amount: Money<'a, T>) -> Self {
		Self::new(
			*amount.amount(),
			Currency::Crypto(amount.currency().to_string()),
		)
	}
}

#[cfg(test)]
mod tests {
	use super::*;
	use rust_decimal_macros::dec;
	use rusty_money::crypto;

	#[test]
	fn convert_from_money() {
		assert_eq!(
			Amount::new(dec!(125), Currency::Crypto("USDC".to_string())),
			Money::from_major(125, crypto::USDC).into()
		);
	}
}
