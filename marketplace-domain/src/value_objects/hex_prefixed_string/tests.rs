use super::*;
use serde_test::{assert_de_tokens, assert_de_tokens_error, Token};

#[test]
fn test_de_hex_prefixed_string() {
	let test_string = HexPrefixedString::from_str("0x0123456789abcdef").unwrap();

	assert_de_tokens(&test_string, &[Token::Str("0x0123456789abcdef")])
}

#[test]
fn test_de_hex_prefixed_string_uppercase() {
	let result_string = HexPrefixedString::from_str("0x0123456789abcdef").unwrap();

	assert_de_tokens(&result_string, &[Token::Str("0x0123456789ABCDEF")])
}

#[test]
fn test_de_hex_prefixed_string_0x0() {
	let test_string = HexPrefixedString::from_str("0x0").unwrap();

	assert_de_tokens(&test_string, &[Token::Str("0x0")])
}

#[test]
fn test_de_hex_prefixed_string_wrong_prefix() {
	let test_str = "xxabc";
	assert_de_tokens_error::<HexPrefixedString>(
		&[Token::Str(test_str)],
		&format!(
			"invalid value: string \"{}\", expected a \"0x\" prefixed string, encoding the hexadecimal representation of a number",
			test_str
		),
	)
}

#[test]
fn test_de_hex_prefixed_string_too_short() {
	let test_str = "0x";
	assert_de_tokens_error::<HexPrefixedString>(
		&[Token::Str(test_str)],
		&format!(
			"invalid length {}, expected a \"0x\" prefixed string, encoding the hexadecimal representation of a number",
			test_str.len()
		),
	)
}

#[test]
fn test_de_hex_prefixed_string_non_af_char() {
	let test_str = "0x0t";
	assert_de_tokens_error::<HexPrefixedString>(
		&[Token::Str(test_str)],
		&format!(
			"invalid value: string \"{}\", expected a \"0x\" prefixed string, encoding the hexadecimal representation of a number",
			test_str
		),
	)
}

#[test]
fn serde() {
	let value = HexPrefixedString::from_str("0x1234").unwrap();
	let serialized = serde_json::to_string(&value).unwrap();
	assert_eq!(value, serde_json::from_str(&serialized).unwrap());
}

#[test]
fn from_into_u256() {
	let value = U256::from_u128(123);
	assert_eq!(value, HexPrefixedString::from(value).try_into().unwrap());
}

#[test]
fn into_u256_too_long() {
	let bytes = format!("0x{}", ["1"; 65].concat());
	let result: Result<U256, _> = HexPrefixedString::from_str(&bytes).unwrap().try_into();
	assert!(result.is_err());
}

#[test]
fn padding_and_truncating() {
	let mut same_values = vec![
		HexPrefixedString::from_str("0x123").unwrap(),
		HexPrefixedString::from_str("0x00123").unwrap(),
		HexPrefixedString::from(U256::from_u128(291)),
		HexPrefixedString::from_bytes(vec![0, 0, 0, 0, 0, 1, 35]),
		HexPrefixedString::from(vec![1, 35]),
	];

	same_values.dedup();

	assert_eq!(1, same_values.len());
	assert_eq!("0x0123", same_values[0].to_string());
}
