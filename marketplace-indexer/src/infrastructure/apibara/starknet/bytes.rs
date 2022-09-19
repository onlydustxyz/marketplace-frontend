use anyhow::anyhow;
use marketplace_domain::HexPrefixedString;
use starknet::core::types::FieldElement;

pub type Bytes = Vec<u8>;

pub trait TryFromBytes: Sized {
	type Error;
	fn try_from_bytes(value: Bytes) -> Result<Self, Self::Error>;
}

impl TryFromBytes for FieldElement {
	type Error = anyhow::Error;

	fn try_from_bytes(bytes: Bytes) -> Result<Self, Self::Error> {
		let bytes: [u8; 32] = bytes.try_into().map_err(|error| anyhow!("{:?}", error))?;
		Ok(FieldElement::from_bytes_be(&bytes).map_err(anyhow::Error::msg)?)
	}
}

impl TryFromBytes for HexPrefixedString {
	type Error = anyhow::Error;

	fn try_from_bytes(value: Bytes) -> Result<Self, Self::Error> {
		let felt = FieldElement::try_from_bytes(value)?;
		format!("{felt:#x}").parse().map_err(anyhow::Error::msg)
	}
}

#[cfg(test)]
mod test {
	use super::*;
	use rstest::*;

	#[rstest]
	fn conversion_success() {
		let result = FieldElement::try_from_bytes(vec![0; 32]);
		assert!(result.is_ok(), "{}", result.err().unwrap());
		assert_eq!(FieldElement::ZERO, result.unwrap());
	}

	#[rstest]
	fn conversion_error() {
		let result = FieldElement::try_from_bytes(vec![0; 12]);
		assert!(result.is_err());
	}
}
