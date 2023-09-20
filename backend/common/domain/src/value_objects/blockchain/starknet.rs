use std::fmt::Display;

use derive_more::{From, FromStr, Into};
use serde::{Deserialize, Serialize};
use starknet_ff::FieldElement;

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize, From, Into, FromStr)]
#[serde(transparent)]
pub struct Address(FieldElement);

impl Display for Address {
	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
		write!(f, "{:#064x}", self.0)
	}
}

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize, From, Into, FromStr)]
#[serde(transparent)]
pub struct TransactionHash(FieldElement);

impl Display for TransactionHash {
	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
		write!(f, "{:#064x}", self.0)
	}
}
