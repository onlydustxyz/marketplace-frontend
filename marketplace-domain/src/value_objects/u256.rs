use std::{cmp::max, str::FromStr};

use crypto_bigint::{Encoding, U256};
use thiserror::Error;

use super::{HexPrefixedString, ParseHexPrefixedStringError};

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
	let bytes = left_pad_with(hex_prefixed_string.to_bytes(), 0, 32) // Pad with 0s if len < 32
		.try_into()
		.map_err(|_| ParseU256Error::InvalidLength)?;
	Ok(U256::from_be_bytes(bytes))
}

fn left_pad_with<T: Clone>(values: Vec<T>, padding: T, width: usize) -> Vec<T> {
	if values.len() >= width {
		return values;
	}

	let diff = max(0, width - values.len());
	let mut padded: Vec<_> = std::iter::repeat(padding).take(diff).collect();
	padded.extend(values);
	padded
}
