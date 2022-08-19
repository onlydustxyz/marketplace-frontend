use std::{fmt::Display, str::FromStr};

use serde::{Deserialize, Serialize};

use crypto_bigint::U256;

use crate::dto::{u256_from_string, ParseU256Error};

#[derive(Copy, Clone, Debug, PartialEq, Eq, Serialize, Deserialize, Hash, Default)]
pub struct Id(pub U256);

#[derive(Clone, Debug, PartialEq, Eq, Default)]
pub struct Contributor {
	pub id: Id,
	pub github_username: Option<String>,
	pub github_handle: Option<String>,
}

impl FromStr for Id {
	type Err = ParseU256Error;

	fn from_str(s: &str) -> Result<Self, Self::Err> {
		u256_from_string(s).map(Self)
	}
}

impl From<U256> for Id {
	fn from(v: U256) -> Self {
		Self(v)
	}
}

impl Display for Id {
	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
		write!(f, "0x{}", self.0.to_string().to_lowercase())
	}
}

impl From<u128> for Id {
	fn from(id: u128) -> Self {
		Self(U256::from_u128(id))
	}
}
