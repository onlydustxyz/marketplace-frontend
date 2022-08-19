#[cfg(test)]
mod tests;

use marketplace_domain::{hex_prefixed_from_str, ParseHexPrefixedStringError};
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

#[derive(JsonSchema)]
#[cfg_attr(test, derive(Debug, PartialEq, Eq))]
pub struct HexPrefixedString(String);

impl HexPrefixedString {
	pub fn as_str(&self) -> &str {
		&self.0
	}
}

struct HexPrefixedStringVisitor;

impl FromStr for HexPrefixedString {
	type Err = ParseHexPrefixedStringError;

	fn from_str(s: &str) -> Result<Self, Self::Err> {
		hex_prefixed_from_str(s).map(HexPrefixedString)
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

#[rocket::async_trait]
impl<'r> FromFormField<'r> for HexPrefixedString {
	fn from_value(field: ValueField<'r>) -> form::Result<'r, Self> {
		HexPrefixedString::from_str(field.value).map_err(|parse_error| match parse_error {
			ParseHexPrefixedStringError::TooShort => form::error::ErrorKind::InvalidLength {
				min: Some(3),
				max: None,
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
