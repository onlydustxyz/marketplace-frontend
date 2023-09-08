use derive_more::From;
use serde::{Deserialize, Serialize};

mod address;
pub use address::Address;

mod name;
pub use name::Name;

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize, From)]
pub enum Wallet {
	Address(Address),
	Name(Name),
}

impl Default for Wallet {
	fn default() -> Self {
		Self::Address(Default::default())
	}
}
