use std::str::FromStr;

pub use custom::{find, Currency, APTOS, ETH, OPTIMISM, STARK, USD};
use serde::{Deserialize, Deserializer, Serialize, Serializer};
use thiserror::Error;

use crate::SubscriberCallbackError;

#[derive(Debug, Error, PartialEq, Eq)]
pub enum ParseError {
	#[error("Provided currency is not supported")]
	NotSupported,
}

impl From<ParseError> for SubscriberCallbackError {
	fn from(error: ParseError) -> Self {
		Self::Discard(error.into())
	}
}

impl FromStr for &'static Currency {
	type Err = ParseError;

	fn from_str(code: &str) -> Result<Self, Self::Err> {
		custom::find(code).ok_or(ParseError::NotSupported)
	}
}

impl Serialize for &'static Currency {
	fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
	where
		S: Serializer,
	{
		serializer.serialize_str(self.code)
	}
}

impl<'de> Deserialize<'de> for &'static Currency {
	fn deserialize<D>(deserializer: D) -> Result<&'static Currency, D::Error>
	where
		D: Deserializer<'de>,
	{
		String::deserialize(deserializer)?
			.parse::<&'static Currency>()
			.map_err(|e| serde::de::Error::custom(e.to_string()))
	}
}

impl Default for &'static Currency {
	fn default() -> Self {
		custom::NO_CURRENCY
	}
}

rusty_money::define_currency_set!(
	custom {
		NO_CURRENCY : {
			code: "",
			exponent: 0,
			locale: EnUs,
			minor_units: 0,
			name: "",
			symbol: "",
			symbol_first: false,
		},USD : {
			code: "USD",
			exponent: 2,
			locale: EnUs,
			minor_units: 1,
			name: "United States Dollar",
			symbol: "$",
			symbol_first: true,
		},
		ETH: {
			code: "ETH",
			exponent: 18,
			locale: EnUs,
			minor_units: 1_000_000_000_000_000_000,
			name: "Ether",
			symbol: "ETH",
			symbol_first: false,
		},
		OPTIMISM: {
			code: "OP",
			exponent: 18,
			locale: EnUs,
			minor_units: 1_000_000_000_000_000_000,
			name: "Optimism",
			symbol: "OP",
			symbol_first: false,
		},
		APTOS: {
			code: "APT",
			exponent: 8,
			locale: EnUs,
			minor_units: 100_000_000,
			name: "Aptos",
			symbol: "APT",
			symbol_first: false,
		},
		STARK: {
			code: "STARK",
			exponent: 18,
			locale: EnUs,
			minor_units: 1_000_000_000_000_000_000,
			name: "Stark",
			symbol: "STARK",
			symbol_first: false,
		}
	}
);

#[cfg(test)]
mod tests {
	use rstest::*;

	use super::*;

	#[rstest]
	#[case("USD", USD)]
	#[case("ETH", ETH)]
	#[case("OP", OPTIMISM)]
	#[case("APT", APTOS)]
	#[case("STARK", STARK)]
	pub fn supported_currencies(#[case] input: &str, #[case] output: &Currency) {
		assert_eq!(
			output,
			input.parse::<&Currency>().expect("invalid currency")
		);
	}

	#[rstest]
	#[case("EUR")]
	#[case("SGD")]
	#[case("BTC")]
	pub fn not_supported_currencies(#[case] input: &str) {
		assert_eq!(
			input.parse::<&Currency>().unwrap_err(),
			ParseError::NotSupported
		);
	}
}
