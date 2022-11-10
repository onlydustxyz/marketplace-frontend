use crate::HexPrefixedString;
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub enum Network {
	Ethereum,
}

pub type TransactionHash = HexPrefixedString;
pub type ContractAddress = HexPrefixedString;
