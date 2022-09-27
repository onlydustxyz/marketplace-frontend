use std::str::FromStr;

use marketplace_domain::*;
use okapi::openapi3::SchemaObject;
use rocket::{
	data::ToByteUnit,
	form::{self, DataField, FromFormField, ValueField},
	request::FromParam,
};
use schemars::{
	schema::{InstanceType, StringValidation},
	JsonSchema,
};
use serde::{Deserialize, Serialize};
use starknet::core::types::FieldElement;
use thiserror::Error;

#[derive(Serialize, Deserialize, Debug, Clone, Eq, PartialEq, Hash)]
pub struct HexPrefixedStringDto(HexPrefixedString);

impl From<HexPrefixedStringDto> for HexPrefixedString {
	fn from(value: HexPrefixedStringDto) -> Self {
		value.0
	}
}

impl From<HexPrefixedStringDto> for ContributorAccount {
	fn from(value: HexPrefixedStringDto) -> Self {
		value.0.into()
	}
}

impl From<HexPrefixedStringDto> for ContributionId {
	fn from(value: HexPrefixedStringDto) -> Self {
		value.0.into()
	}
}

impl FromStr for HexPrefixedStringDto {
	type Err = ParseHexPrefixedStringError;

	fn from_str(s: &str) -> Result<Self, Self::Err> {
		HexPrefixedString::from_str(s).map(HexPrefixedStringDto)
	}
}

#[derive(Error, Debug)]
#[error("Failed to convert")]
pub struct FromHexPrefixedStringError(#[from] anyhow::Error);

impl TryFrom<HexPrefixedStringDto> for FieldElement {
	type Error = FromHexPrefixedStringError;

	fn try_from(value: HexPrefixedStringDto) -> Result<Self, Self::Error> {
		FieldElement::from_hex_be(&value.0.to_string())
			.map_err(anyhow::Error::msg)
			.map_err(FromHexPrefixedStringError::from)
	}
}

impl JsonSchema for HexPrefixedStringDto {
	fn schema_name() -> String {
		"HexPrefixedString".to_string()
	}

	fn json_schema(_: &mut schemars::gen::SchemaGenerator) -> schemars::schema::Schema {
		let schema = SchemaObject {
			instance_type: Some(InstanceType::String.into()),
			string: Some(Box::new(StringValidation {
				min_length: Some(3),
				max_length: Some(66),
				pattern: Some("\\b0x[0-9a-f]+\\b".to_string()),
			})),
			..Default::default()
		};

		schema.into()
	}
}

#[rocket::async_trait]
impl<'r> FromFormField<'r> for HexPrefixedStringDto {
	fn from_value(field: ValueField<'r>) -> form::Result<'r, Self> {
		HexPrefixedString::from_str(field.value)
			.map(HexPrefixedStringDto)
			.map_err(|parse_error| match parse_error {
				ParseHexPrefixedStringError::TooShort => form::error::ErrorKind::InvalidLength {
					min: Some(3),
					max: Some(66),
				}
				.into(),
				ParseHexPrefixedStringError::InvalidPrefix
				| ParseHexPrefixedStringError::InvalidHexa(_) =>
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

		HexPrefixedString::from_str(s).map(HexPrefixedStringDto).map_err(|parse_error| {
			match parse_error {
				ParseHexPrefixedStringError::TooShort => form::error::ErrorKind::InvalidLength {
					min: Some(3),
					max: Some(66),
				}
				.into(),
				ParseHexPrefixedStringError::InvalidPrefix
				| ParseHexPrefixedStringError::InvalidHexa(_) =>
					form::Error::validation(parse_error.to_string()).into(),
			}
		})
	}
}

impl<'a> FromParam<'a> for HexPrefixedStringDto {
	type Error = <HexPrefixedString as FromStr>::Err;

	fn from_param(param: &'a str) -> Result<Self, Self::Error> {
		HexPrefixedString::from_str(param).map(HexPrefixedStringDto)
	}
}

#[cfg(test)]
mod test {
	use super::*;
	use marketplace_domain::HexPrefixedString;
	use rstest::rstest;
	use std::str::FromStr;

	#[rstest]
	fn try_from_hex_prefixed_string() {
		let string: HexPrefixedStringDto =
			HexPrefixedStringDto(HexPrefixedString::from_str("0x112233").unwrap());
		assert_eq!(string.0.to_string(), "0x00112233");
		let felt: FieldElement = FieldElement::try_from(string).unwrap();
		assert_eq!(felt.to_string(), "1122867");
	}
}
