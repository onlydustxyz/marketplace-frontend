use crypto_bigint::{Encoding, U256};
use thiserror::Error;

use super::{hex_prefixed_from_str, ParseHexPrefixedStringError};

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
			ParseHexPrefixedStringError::InvalidCharacter => ParseU256Error::InvalidCharacter,
		}
	}
}

impl From<base16ct::Error> for ParseU256Error {
	fn from(error: base16ct::Error) -> Self {
		match error {
			base16ct::Error::InvalidEncoding => ParseU256Error::InvalidCharacter,
			base16ct::Error::InvalidLength => ParseU256Error::InvalidLength,
		}
	}
}

pub fn u256_from_string(s: &str) -> Result<U256, ParseU256Error> {
	let hex_prefixed_string = hex_prefixed_from_str(s).map_err(ParseU256Error::from)?;

	let bytes = &hex_prefixed_string.as_bytes()[2..];
	let mut len = bytes.len();

	if len > 64 {
		return Err(ParseU256Error::InvalidLength);
	}

	let mut pair_bytes = Vec::new();
	if len % 2 != 0 {
		pair_bytes.push(b'0');
		len += 1;
	}
	pair_bytes.extend_from_slice(bytes);

	let mut buffer = U256::ZERO.to_le_bytes();
	base16ct::mixed::decode(pair_bytes, &mut buffer[32 - len / 2..])
		.map_err(ParseU256Error::from)?;

	Ok(U256::from_be_bytes(buffer))
}
