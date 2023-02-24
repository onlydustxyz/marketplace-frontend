use std::ops::{Add, Deref, Mul, Sub};

use derive_getters::Getters;
use derive_more::Display;
use rust_decimal::Decimal;
use rusty_money::{FormattableCurrency, Money};
use serde::{Deserialize, Serialize};

#[derive(
	Debug, Default, Clone, PartialEq, Eq, PartialOrd, Ord, Serialize, Deserialize, Getters,
)]
pub struct Amount {
	amount: Decimal,
	currency: Currency,
}

impl std::fmt::Display for Amount {
	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
		write!(f, "{} {}", self.amount, self.currency)
	}
}

impl Add<&Decimal> for Amount {
	type Output = Self;

	fn add(self, rhs: &Decimal) -> Self::Output {
		Self {
			amount: self.amount + rhs,
			..self
		}
	}
}

impl Sub<&Self> for Amount {
	type Output = Self;

	fn sub(self, rhs: &Self) -> Self::Output {
		assert_eq!(
			self.currency, rhs.currency,
			"Cannot substract with different currencies"
		);
		Self {
			amount: self.amount - rhs.amount,
			..self
		}
	}
}

impl Sub<Decimal> for &Amount {
	type Output = <Self as Deref>::Target;

	fn sub(self, rhs: Decimal) -> Self::Output {
		Amount {
			amount: self.amount - rhs,
			currency: self.currency.clone(),
		}
	}
}

impl Mul<i64> for Amount {
	type Output = Self;

	fn mul(self, rhs: i64) -> Self::Output {
		Self {
			amount: self.amount * Decimal::new(rhs, 0),
			..self
		}
	}
}

#[derive(Debug, Clone, PartialEq, Eq, PartialOrd, Ord, Serialize, Deserialize, Display)]
pub enum Currency {
	Crypto(String),
}

impl Default for Currency {
	fn default() -> Self {
		Self::Crypto(Default::default())
	}
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
	use rust_decimal_macros::dec;
	use rusty_money::crypto;

	use super::*;

	#[test]
	fn convert_from_money() {
		assert_eq!(
			Amount::new(dec!(125), Currency::Crypto("USDC".to_string())),
			Money::from_major(125, crypto::USDC).into()
		);
	}

	#[test]
	fn add() {
		let amount1 = Amount::new(dec!(125), Currency::Crypto("USDC".to_string()));
		assert_eq!(
			Amount::new(dec!(130), Currency::Crypto("USDC".to_string())),
			amount1 + &dec!(5)
		);
	}

	#[test]
	fn substract() {
		let amount1 = Amount::new(dec!(125), Currency::Crypto("USDC".to_string()));
		let amount2 = Amount::new(dec!(5), Currency::Crypto("USDC".to_string()));
		assert_eq!(
			Amount::new(dec!(120), Currency::Crypto("USDC".to_string())),
			amount1 - &amount2
		);
	}

	#[test]
	fn substract_decimal() {
		let amount1 = Amount::new(dec!(125), Currency::Crypto("USDC".to_string()));
		assert_eq!(
			Amount::new(dec!(120), Currency::Crypto("USDC".to_string())),
			&amount1 - dec!(5)
		);
	}

	#[test]
	#[should_panic = "Cannot substract with different currencies"]
	fn substract_different_currencies() {
		let amount1 = Amount::new(dec!(125), Currency::Crypto("USDC".to_string()));
		let amount2 = Amount::new(dec!(5), Currency::Crypto("USDT".to_string()));
		let _ = amount1 - &amount2;
	}
}
