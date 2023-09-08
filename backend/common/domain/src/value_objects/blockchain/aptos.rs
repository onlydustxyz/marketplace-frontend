use derive_more::{Display, From, FromStr, Into};
use serde::{Deserialize, Serialize};

use crate::blockchain::account_address::AccountAddress;

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize, From, Into, FromStr, Display)]
#[serde(transparent)]
pub struct Address(AccountAddress<32>);
