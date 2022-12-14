use juniper::GraphQLInputObject;
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize, AsExpression, FromToSql, FromSqlRow)]
#[sql_type = "diesel::sql_types::Jsonb"]
pub enum PayoutSettings {
	WireTransfer(BankAddress),
	EthTransfer(EthereumAddress),
}

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
#[serde(transparent)]
pub struct EthereumAddress(String);

#[juniper::graphql_scalar(
	description = "A `0x` prefixed hexadecimal string representing 20 bytes of data"
)]
impl<S> GraphQLScalar for EthereumAddress
where
	S: juniper::ScalarValue,
{
	fn resolve(&self) -> juniper::Value {
		juniper::Value::scalar(self.0.to_owned())
	}

	fn from_input_value(value: &juniper::InputValue) -> Option<Self> {
		let str_value = value.as_string_value()?;
		if str_value.len() < 3 || str_value.len() > 42 || str_value[0..2].to_lowercase() != "0x" {
			None
		} else {
			let padded = format!(
				"0x{:0>width$}",
				&str_value[2..].to_lowercase(),
				width = str_value.len() - 2 + str_value.len() % 2
			); // Add 0 if len is odd
			Some(EthereumAddress(padded))
		}
	}

	fn from_str<'a>(value: juniper::ScalarToken<'a>) -> juniper::ParseScalarResult<'a, S> {
		<String as juniper::ParseScalarValue<S>>::from_str(value)
	}
}

#[derive(Debug, Clone, Serialize, Deserialize, GraphQLInputObject)]
#[allow(non_snake_case)]
pub struct BankAddress {
	BIC: String,
	IBAN: String,
}

#[cfg(test)]
mod test {
	use juniper::{DefaultScalarValue, FromInputValue, InputValue};
	use rstest::rstest;

	use super::EthereumAddress;

	#[rstest]
	#[case(InputValue::Scalar(DefaultScalarValue::String("0x0".to_string())), true)]
	#[case(InputValue::Scalar(DefaultScalarValue::String("0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045".to_string())), true)]
	#[case(InputValue::Scalar(DefaultScalarValue::String("0xd8da6bf26964af9d7eed9e03e53415d37aa96045".to_string())), true)]
	#[case(InputValue::Scalar(DefaultScalarValue::String("0Xd8da6bf26964af9d7eed9e03e53415d37aa96045".to_string())), true)]
	#[case(InputValue::Scalar(DefaultScalarValue::String("0xd8dA6BF26964aF9D7".to_string())), true)]
	#[case(InputValue::Scalar(DefaultScalarValue::String("d8da6bf26964af9d7eed9e03e53415d37aa96045".to_string())), false)]
	#[case(InputValue::Scalar(DefaultScalarValue::String("0xfd8da6bf26964af9d7eed9e03e53415d37aa96045".to_string())), false)]
	#[case(InputValue::Scalar(DefaultScalarValue::String("xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045".to_string())), false)]
	#[case(InputValue::Scalar(DefaultScalarValue::Int(0x0)), false)]
	#[case(InputValue::Scalar(DefaultScalarValue::Float(4.2)), false)]
	#[case(InputValue::Scalar(DefaultScalarValue::Boolean(false)), false)]
	#[case(InputValue::Null, false)]
	#[case(InputValue::Enum("0x0".to_string()), false)]
	#[case(InputValue::Variable("0x0".to_string()), false)]
	#[case(InputValue::list(vec![InputValue::Scalar(DefaultScalarValue::String("0x0".to_string()))]), false)]
	#[case(InputValue::<DefaultScalarValue>::Object(Default::default()), false)]
	fn is_valid_ethereum_address(#[case] input: juniper::InputValue, #[case] expect: bool) {
		assert_eq!(EthereumAddress::from_input_value(&input).is_some(), expect)
	}
}
