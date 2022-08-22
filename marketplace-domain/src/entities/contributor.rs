use crate::{HexPrefixedString, ParseHexPrefixedStringError};
use crypto_bigint::U256;
use serde::{Deserialize, Serialize};
use std::{fmt::Display, str::FromStr};

#[derive(Clone, Debug, PartialEq, Eq, Serialize, Deserialize, Hash, Default)]
pub struct Id(HexPrefixedString);

impl Into<U256> for Id {
	fn into(self) -> U256 {
		self.0.into()
	}
}

#[derive(Clone, Debug, PartialEq, Eq, Default)]
pub struct Contributor {
	pub id: Id,
	pub github_username: Option<String>,
	pub github_handle: Option<String>,
}

impl FromStr for Id {
	type Err = ParseHexPrefixedStringError;

	fn from_str(s: &str) -> Result<Self, Self::Err> {
		HexPrefixedString::from_str(s).map(Self)
	}
}

impl From<U256> for Id {
	fn from(v: U256) -> Self {
		Self(HexPrefixedString::from(v))
	}
}

impl Display for Id {
	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
		write!(f, "{}", self.0.to_string())
	}
}

impl From<u128> for Id {
	fn from(id: u128) -> Self {
		U256::from_u128(id).into()
	}
}
