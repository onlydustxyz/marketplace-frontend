mod constants;
pub use constants::*;

use starknet::core::types::FieldElement;

pub trait AsFelt {
	fn as_felt(&self) -> Vec<u8>;
}

impl AsFelt for &str {
	fn as_felt(&self) -> Vec<u8> {
		FieldElement::from_hex_be(self).unwrap().to_bytes_be().to_vec()
	}
}
