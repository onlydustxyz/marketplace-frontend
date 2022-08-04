#[cfg(test)]
mod tests;

use rocket::{
	data::ToByteUnit,
	form::{self, DataField, FromFormField, ValueField},
};
use schemars::JsonSchema;
use serde::{
	de::{self, Unexpected, Visitor},
	Deserialize,
};
use std::str::FromStr;
use thiserror::Error;

#[derive(Debug, JsonSchema, PartialEq, Eq)]
pub struct HexPrefixedString(String);

impl HexPrefixedString {
	pub fn as_str(&self) -> &str {
		&self.0
	}

	pub fn as_unprefixed_str(&self) -> &str {
		&self.0[2..]
	}
}

struct HexPrefixedStringVisitor;

#[derive(Debug, Error)]
pub enum ParseHexPrefixedStringError {
	#[error("provided sting shoud be at least tree characters long")]
	TooShort,
	#[error("provided sting shoud be '0x' prefixed")]
	InvalidPrefix,
	#[error(
		"provided sting shoud only contain characters in the 0-9, a-f and A-F ranges (except for the prefix)"
	)]
	InvalidCharacter,
}

impl FromStr for HexPrefixedString {
	type Err = ParseHexPrefixedStringError;

	fn from_str(s: &str) -> Result<Self, Self::Err> {
		if s.len() < 3 {
			return Err(ParseHexPrefixedStringError::TooShort);
		}

		let lowercase_value = s.to_lowercase();

		if &lowercase_value[0..2] != "0x" {
			Err(ParseHexPrefixedStringError::InvalidPrefix)
		} else if !lowercase_value[2..].chars().all(|c| c.is_numeric() || ('a'..='f').contains(&c))
		{
			Err(ParseHexPrefixedStringError::InvalidCharacter)
		} else {
			Ok(HexPrefixedString(lowercase_value))
		}
	}
}

impl<'de> Visitor<'de> for HexPrefixedStringVisitor {
	type Value = HexPrefixedString;

	fn expecting(&self, formatter: &mut std::fmt::Formatter) -> std::fmt::Result {
		formatter.write_str("a \"0x\" prefixed string representation of an hexadecimal number")
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

#[rocket::async_trait]
impl<'r> FromFormField<'r> for HexPrefixedString {
	fn from_value(field: ValueField<'r>) -> form::Result<'r, Self> {
		HexPrefixedString::from_str(field.value).map_err(|parse_error| match parse_error {
			ParseHexPrefixedStringError::TooShort => form::error::ErrorKind::InvalidLength {
				min: Some(3),
				max: Some(66),
			}
			.into(),
			ParseHexPrefixedStringError::InvalidPrefix =>
				form::Error::validation(parse_error.to_string()).into(),
			ParseHexPrefixedStringError::InvalidCharacter =>
				form::Error::validation(parse_error.to_string()).into(),
		})
	}

	async fn from_data(field: DataField<'r, '_>) -> form::Result<'r, Self> {
		let limit = 256.kibibytes();
		let bytes = field.data.open(limit).into_bytes().await?;
		if !bytes.is_complete() {
			Err((None, Some(limit)))?;
		}

		let bytes = bytes.into_inner();
		let bytes = rocket::request::local_cache!(field.request, bytes);
		let s = std::str::from_utf8(bytes)?;

		Ok(HexPrefixedString(s.to_string()))
	}
}
