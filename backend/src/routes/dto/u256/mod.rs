#[cfg(test)]
mod tests;

use std::str::FromStr;

use crypto_bigint::U256;
use deathnote_contributions_feeder::{
	domain::ContributorId,
	dto::{u256_from_string, ParseU256Error},
};
use rocket::{
	data::ToByteUnit,
	form::{self, DataField, FromFormField, ValueField},
	request::FromParam,
};
use schemars::{
	schema::{InstanceType, SchemaObject, StringValidation},
	JsonSchema,
};
use serde::{
	de::{self, Unexpected, Visitor},
	Deserialize, Deserializer,
};

#[cfg_attr(test, derive(Debug, PartialEq, Eq))]
pub struct U256Param(U256);

impl From<U256Param> for ContributorId {
	fn from(param: U256Param) -> Self {
		Self(param.0)
	}
}

impl From<U256> for U256Param {
	fn from(v: U256) -> Self {
		Self(v)
	}
}

pub struct U256ParamVisitor;

impl<'de> Visitor<'de> for U256ParamVisitor {
	type Value = U256Param;

	fn expecting(&self, formatter: &mut std::fmt::Formatter) -> std::fmt::Result {
		formatter.write_str(
			"a \"0x\" prefixed string, encoding the hexadecimal representation of an u256",
		)
	}

	fn visit_str<E>(self, v: &str) -> Result<Self::Value, E>
	where
		E: serde::de::Error,
	{
		U256Param::from_str(v).map_err(|parse_error| match parse_error {
			ParseU256Error::InvalidLength => de::Error::invalid_length(v.len(), &self),
			_ => de::Error::invalid_value(Unexpected::Str(v), &self),
		})
	}
}

impl<'de> Deserialize<'de> for U256Param {
	fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
	where
		D: Deserializer<'de>,
	{
		deserializer.deserialize_str(U256ParamVisitor)
	}
}

impl FromStr for U256Param {
	type Err = ParseU256Error;

	fn from_str(s: &str) -> Result<Self, Self::Err> {
		u256_from_string(s).map(U256Param)
	}
}

impl JsonSchema for U256Param {
	fn schema_name() -> String {
		"U256".to_string()
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
impl<'r> FromFormField<'r> for U256Param {
	fn from_value(field: ValueField<'r>) -> form::Result<'r, Self> {
		U256Param::from_str(field.value).map_err(|parse_error| match parse_error {
			ParseU256Error::InvalidLength => form::error::ErrorKind::InvalidLength {
				min: Some(3),
				max: Some(66),
			}
			.into(),
			ParseU256Error::InvalidPrefix =>
				form::Error::validation(parse_error.to_string()).into(),
			ParseU256Error::InvalidCharacter =>
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

		U256Param::from_str(s).map_err(|e| match e {
			ParseU256Error::InvalidLength => form::error::ErrorKind::InvalidLength {
				min: Some(3),
				max: Some(66),
			}
			.into(),
			ParseU256Error::InvalidPrefix => form::Error::validation(e.to_string()).into(),
			ParseU256Error::InvalidCharacter => form::Error::validation(e.to_string()).into(),
		})
	}
}

impl<'a> FromParam<'a> for U256Param {
	type Error = <U256Param as FromStr>::Err;

	fn from_param(param: &'a str) -> Result<Self, Self::Error> {
		U256Param::from_str(param)
	}
}
