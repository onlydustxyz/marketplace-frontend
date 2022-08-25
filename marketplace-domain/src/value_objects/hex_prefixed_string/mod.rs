#[cfg(test)]
mod tests;

use crypto_bigint::{Encoding, Limb, UInt, U256};
use serde::{
	de::{self, Unexpected, Visitor},
	Deserialize, Serialize,
};
use std::{
	fmt::{Debug, Display},
	str::FromStr,
};
use thiserror::Error;

#[derive(PartialEq, Eq, Clone, Serialize, Debug, Hash)]
pub struct HexPrefixedString(String);

impl HexPrefixedString {
	pub fn to_bytes(&self) -> Vec<u8> {
		// Safe to unwrap as value checked during construction
		hex::decode(&self.0[2..]).unwrap()
	}

	pub fn from_bytes(bytes: Vec<u8>) -> Self {
		let bytes: Vec<u8> = bytes.into_iter().skip_while(|byte| *byte == 0).collect();

		if bytes.is_empty() {
			return Self::default();
		}

		let bytes = if bytes.len() % 2 == 0 {
			bytes
		} else {
			let mut padded = vec![0];
			padded.extend(bytes);
			padded
		};

		Self(format!("0x{}", hex::encode(bytes)))
	}
}

impl Default for HexPrefixedString {
	fn default() -> Self {
		Self(String::from("0x00"))
	}
}

#[derive(Debug, Error)]
pub enum ParseHexPrefixedStringError {
	#[error("provided string shoud be at least 4 characters long")]
	TooShort,
	#[error("provided string shoud be '0x' prefixed")]
	InvalidPrefix,
	#[error("provided string is not a valid hexadecimal string")]
	InvalidHexa(#[from] hex::FromHexError),
}

struct HexPrefixedStringVisitor;

impl FromStr for HexPrefixedString {
	type Err = ParseHexPrefixedStringError;

	fn from_str(s: &str) -> Result<Self, Self::Err> {
		match s {
			s if s.len() < 3 => Err(Self::Err::TooShort),
			s if s[0..2].to_lowercase() != "0x" => Err(Self::Err::InvalidPrefix),
			s => {
				let padded = format!("{:0>width$}", &s[2..], width = s.len() - 2 + s.len() % 2); // Add 0 if len is odd
				let bytes = hex::decode(&padded).map_err(Self::Err::from)?;
				Ok(Self::from_bytes(bytes))
			},
		}
	}
}

impl Display for HexPrefixedString {
	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
		write!(f, "{}", self.0)
	}
}

impl<'de> Visitor<'de> for HexPrefixedStringVisitor {
	type Value = HexPrefixedString;

	fn expecting(&self, formatter: &mut std::fmt::Formatter) -> std::fmt::Result {
		formatter.write_str(
			"a \"0x\" prefixed string, encoding the hexadecimal representation of a number",
		)
	}

	fn visit_str<E>(self, v: &str) -> Result<Self::Value, E>
	where
		E: serde::de::Error,
	{
		HexPrefixedString::from_str(v).map_err(|parse_error| match parse_error {
			ParseHexPrefixedStringError::TooShort => de::Error::invalid_length(v.len(), &self),
			_ => de::Error::invalid_value(Unexpected::Str(v), &self),
		})
	}
}

impl<'de> Deserialize<'de> for HexPrefixedString {
	fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
	where
		D: serde::Deserializer<'de>,
	{
		deserializer.deserialize_str(HexPrefixedStringVisitor)
	}
}

impl From<Vec<u8>> for HexPrefixedString {
	fn from(bytes: Vec<u8>) -> Self {
		Self::from_bytes(bytes)
	}
}

#[derive(Debug, Error)]
pub enum ToUIntError {
	#[error("Invalid length, expected {expected}, got {actual}")]
	InvalidLength { expected: usize, actual: usize },
}

impl<const LIMBS: usize> TryFrom<HexPrefixedString> for UInt<LIMBS> {
	type Error = ToUIntError;

	fn try_from(value: HexPrefixedString) -> Result<Self, Self::Error> {
		let expected_size = Limb::BYTE_SIZE * LIMBS * 2;

		let bytes = format!("{:0>expected_size$}", &value.0[2..],);

		match bytes.len() {
			len if len == expected_size => Ok(Self::from_be_hex(&bytes)),
			len => Err(ToUIntError::InvalidLength {
				expected: expected_size,
				actual: len,
			}),
		}
	}
}

impl From<U256> for HexPrefixedString {
	fn from(value: U256) -> Self {
		Self::from_bytes(value.to_be_bytes().to_vec())
	}
}
