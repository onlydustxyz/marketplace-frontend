use crate::{ContractAddress, HexPrefixedString};
use marketplace_wrappers::HexStringWrapper;
use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, PartialEq, Eq, Serialize, Deserialize, Hash, Default, HexStringWrapper)]
pub struct AccountAddress(ContractAddress);

impl From<AccountAddress> for HexPrefixedString {
	fn from(value: AccountAddress) -> Self {
		value.0
	}
}
