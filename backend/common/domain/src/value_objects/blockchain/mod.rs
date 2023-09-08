use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub enum Network {
	Ethereum,
	Optimism,
	Aptos,
	Starknet,
}

pub type TransactionHash = String;

mod account_address;

pub mod aptos;
pub mod evm;
pub mod starknet;
