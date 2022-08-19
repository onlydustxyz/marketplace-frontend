#[cfg(test)]
mod tests;

use mapinto::ResultMapErrInto;
use rocket_okapi::JsonSchema;
use serde::{
	de::{self, Unexpected, Visitor},
	Deserialize,
};
use std::{
	fmt::{Debug, Display},
	str::FromStr,
};
use thiserror::Error;

#[derive(Eq, Default, Clone, JsonSchema)]
pub struct HexPrefixedString(Vec<u8>);

impl HexPrefixedString {
	pub fn bytes(&self) -> Vec<u8> {
		self.0.clone()
	}
}

impl Display for HexPrefixedString {
	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
		write!(f, "0x{}", hex::encode(&self.0))
	}
}

impl Debug for HexPrefixedString {
	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
		write!(f, "0x{}", hex::encode(&self.0))
	}
}

impl PartialEq for HexPrefixedString {
	fn eq(&self, other: &Self) -> bool {
		let is_zero = |val: &&u8| **val == 0;
		self.0.iter().skip_while(is_zero).eq(other.0.iter().skip_while(is_zero))
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
				let decoded: Result<_, Self::Err> = hex::decode(&padded).map_err_into();
				Ok(Self(decoded?))
			},
		}
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
		Self(bytes)
	}
}
