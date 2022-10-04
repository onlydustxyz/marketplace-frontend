pub use super::Account as ContributorAccount;
use crate::HexPrefixedString;
use marketplace_wrappers::HexStringWrapper;
use serde::{Deserialize, Serialize};

use crate::ContractAddress;

#[derive(Clone, Debug, PartialEq, Eq, Serialize, Deserialize, Hash, Default, HexStringWrapper)]
pub struct Account(ContractAddress);

impl From<Account> for HexPrefixedString {
	fn from(value: Account) -> Self {
		value.0
	}
}
