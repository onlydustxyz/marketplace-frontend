use anyhow::anyhow;
use marketplace_domain::{ContributorAccount, HexPrefixedString};
use starknet::core::types::FieldElement;
use std::convert::TryFrom;
use thiserror::Error;

#[derive(Error, Debug)]
pub enum Error {
	#[error("Parsing error")]
	Parse(#[from] anyhow::Error),
}

pub struct HexFieldElement(FieldElement);

impl From<HexFieldElement> for FieldElement {
	fn from(value: HexFieldElement) -> Self {
		value.0
	}
}

impl TryFrom<Vec<u8>> for HexFieldElement {
	type Error = Error;

	fn try_from(value: Vec<u8>) -> Result<Self, Self::Error> {
		let value: [u8; 32] = value.try_into().map_err(|v| anyhow!("{:?}", v))?;
		Ok(HexFieldElement(
			FieldElement::from_bytes_be(&value).map_err(anyhow::Error::msg)?,
		))
	}
}

impl TryFrom<HexPrefixedString> for HexFieldElement {
	type Error = Error;

	fn try_from(value: HexPrefixedString) -> Result<Self, Self::Error> {
		let bytes = value.to_bytes();
		HexFieldElement::try_from(bytes)
			.map_err(anyhow::Error::from)
			.map_err(Error::from)
	}
}

impl TryFrom<ContributorAccount> for HexFieldElement {
	type Error = Error;

	fn try_from(value: ContributorAccount) -> Result<Self, Self::Error> {
		let hex_string: HexPrefixedString = value.into();
		HexFieldElement::try_from(hex_string)
	}
}
