use crate::{ContractAddress, HexPrefixedString};
use marketplace_wrappers::HexStringWrapper;
use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, PartialEq, Eq, Serialize, Deserialize, Hash, Default, HexStringWrapper)]
pub struct AccountAddress(ContractAddress);

impl AccountAddress {
	pub fn as_contract_address(&self) -> &ContractAddress {
		&self.0
	}
}
