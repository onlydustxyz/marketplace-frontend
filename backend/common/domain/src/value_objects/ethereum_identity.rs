use derive_more::From;
use serde::{Deserialize, Serialize};

use super::{EthereumAddress, EthereumName};

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize, From)]
pub enum EthereumIdentity {
	Address(EthereumAddress),
	Name(EthereumName),
}

impl Default for EthereumIdentity {
	fn default() -> Self {
		Self::Address(Default::default())
	}
}
