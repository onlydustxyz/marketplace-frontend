use derive_more::{Display, From, FromStr, Into};
use serde::{Deserialize, Serialize};
use web3::types::H160;

use crate::blockchain;

#[derive(
	Debug, Copy, Clone, PartialEq, Eq, Serialize, Deserialize, From, Into, FromStr, Display,
)]
#[serde(transparent)]
pub struct Address(blockchain::Address<20>);

impl Default for Address {
	fn default() -> Self {
		Self(blockchain::Address::<20>::ZERO)
	}
}

impl From<H160> for Address {
	fn from(address: H160) -> Self {
		Self(address.to_fixed_bytes().into())
	}
}

#[cfg(test)]
mod test {
	use rstest::rstest;

	use super::*;

	#[rstest]
	fn from_h160() {
		const RAW_ADDR: &str = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045";
		let address_as_h160: H160 = RAW_ADDR.parse().unwrap();
		let address_as_eth: Address = RAW_ADDR.parse().unwrap();
		assert_eq!(Address::from(address_as_h160), address_as_eth);
	}
}
