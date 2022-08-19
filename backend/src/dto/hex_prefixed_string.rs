use thiserror::Error;

#[derive(Debug, Error)]
pub enum ParseHexPrefixedStringError {
	#[error("provided sting shoud be at least 3 characters long")]
	TooShort,
	#[error("provided sting shoud be '0x' prefixed")]
	InvalidPrefix,
	#[error(
		"provided sting shoud only contain characters in the 0-9, a-f and A-F ranges (except for the prefix)"
	)]
	InvalidCharacter,
}

pub fn hex_prefixed_from_str(s: &str) -> Result<String, ParseHexPrefixedStringError> {
	if s.len() < 3 {
		return Err(ParseHexPrefixedStringError::TooShort);
	}

	let lowercase_value = s.to_lowercase();

	if &lowercase_value[0..2] != "0x" {
		Err(ParseHexPrefixedStringError::InvalidPrefix)
	} else if !lowercase_value[2..].chars().all(|c| c.is_numeric() || ('a'..='f').contains(&c)) {
		Err(ParseHexPrefixedStringError::InvalidCharacter)
	} else {
		Ok(lowercase_value)
	}
}
