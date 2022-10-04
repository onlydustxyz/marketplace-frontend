use crate::{ContractAddress, HexPrefixedString};
use marketplace_wrappers::HexStringWrapper;
use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, PartialEq, Eq, Serialize, Deserialize, Hash, Default, HexStringWrapper)]
pub struct Account(ContractAddress);

impl From<Account> for HexPrefixedString {
	fn from(value: Account) -> Self {
		value.0
	}
}
