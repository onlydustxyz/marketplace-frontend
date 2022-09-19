mod constants;
pub use constants::*;
use marketplace_domain::HexPrefixedString;

mod starknet;
pub use self::starknet::*;

pub trait As0xString {
	fn as_0x_string(&self) -> HexPrefixedString;
}

impl As0xString for &str {
	fn as_0x_string(&self) -> HexPrefixedString {
		self.parse().unwrap()
	}
}
