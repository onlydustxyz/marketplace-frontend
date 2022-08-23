use std::str::FromStr;

use crypto_bigint::U256;
use thiserror::Error;

use super::{hex_prefixed_string::ToUIntError, HexPrefixedString, ParseHexPrefixedStringError};

#[derive(Debug, Error)]
pub enum ParseU256Error {
	#[error("provided sting shoud be between 3 and 66 characters long")]
	InvalidLength,
	#[error("provided sting shoud be '0x' prefixed")]
	InvalidPrefix,
	#[error(
		"provided sting shoud only contain characters in the 0-9, a-f and A-F ranges (except for the prefix)"
	)]
	InvalidCharacter,
}

impl From<ToUIntError> for ParseU256Error {
	fn from(error: ToUIntError) -> Self {
		match error {
			ToUIntError::InvalidLength {
				expected: _,
				actual: _,
			} => Self::InvalidLength,
		}
	}
}

impl From<ParseHexPrefixedStringError> for ParseU256Error {
	fn from(error: ParseHexPrefixedStringError) -> Self {
		match error {
			ParseHexPrefixedStringError::TooShort => ParseU256Error::InvalidLength,
			ParseHexPrefixedStringError::InvalidPrefix => ParseU256Error::InvalidPrefix,
			ParseHexPrefixedStringError::InvalidHexa(_) => ParseU256Error::InvalidCharacter,
		}
	}
}

pub fn u256_from_string(s: &str) -> Result<U256, ParseU256Error> {
	let hex_prefixed_string = HexPrefixedString::from_str(s).map_err(ParseU256Error::from)?;
	hex_prefixed_string.try_into().map_err(ParseU256Error::from)
}
