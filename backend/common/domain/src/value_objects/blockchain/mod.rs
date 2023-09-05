use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub enum Network {
	Ethereum,
}

pub type TransactionHash = String;

mod account_address;
pub mod ethereum;
