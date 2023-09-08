use derive_more::{Display, From, FromStr, Into};
use serde::{Deserialize, Serialize};
use web3::types::H160;

use crate::blockchain::account_address::AccountAddress;

#[derive(
	Debug, Copy, Clone, PartialEq, Eq, Serialize, Deserialize, From, Into, FromStr, Display,
)]
#[serde(transparent)]
pub struct Address(AccountAddress<20>);

impl Default for Address {
	fn default() -> Self {
		Self(AccountAddress::<20>::ZERO)
	}
}

#[juniper::graphql_scalar(
	description = "A `0x` prefixed hexadecimal string representing 20 bytes of data"
)]
impl<S> GraphQLScalar for Address
where
	S: juniper::ScalarValue,
{
	fn resolve(&self) -> juniper::Value {
		juniper::Value::scalar(self.to_string())
	}

	fn from_input_value(value: &juniper::InputValue) -> Option<Self> {
		value.as_string_value().and_then(|value| value.parse().ok()).map(Self)
	}

	fn from_str<'a>(value: juniper::ScalarToken<'a>) -> juniper::ParseScalarResult<'a, S> {
		<String as juniper::ParseScalarValue<S>>::from_str(value)
	}
}

impl From<H160> for Address {
	fn from(address: H160) -> Self {
		Self(address.to_fixed_bytes().into())
	}
}

#[cfg(test)]
mod test {
	use juniper::{DefaultScalarValue, FromInputValue, InputValue};
	use rstest::rstest;

	use super::*;

	#[rstest]
	#[case(InputValue::Scalar(DefaultScalarValue::String("0x0".to_string())), true)]
	#[case(InputValue::Scalar(DefaultScalarValue::String("0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045".to_string())), true)]
	#[case(InputValue::Scalar(DefaultScalarValue::String("0xd8da6bf26964af9d7eed9e03e53415d37aa96045".to_string())), true)]
	#[case(InputValue::Scalar(DefaultScalarValue::String("0Xd8da6bf26964af9d7eed9e03e53415d37aa96045".to_string())), true)]
	#[case(InputValue::Scalar(DefaultScalarValue::String("0xd8dA6BF26964aF9D7".to_string())), true)]
	#[case(InputValue::Scalar(DefaultScalarValue::String("d8da6bf26964af9d7eed9e03e53415d37aa96045".to_string())), false)]
	#[case(InputValue::Scalar(DefaultScalarValue::String("0xfd8da6bf26964af9d7eed9e03e53415d37aa96045".to_string())), false)]
	#[case(InputValue::Scalar(DefaultScalarValue::String("xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045".to_string())), false)]
	#[case(InputValue::Scalar(DefaultScalarValue::String("0x1G".to_string())), false)]
	#[case(InputValue::Scalar(DefaultScalarValue::Int(0x0)), false)]
	#[case(InputValue::Scalar(DefaultScalarValue::Float(4.2)), false)]
	#[case(InputValue::Scalar(DefaultScalarValue::Boolean(false)), false)]
	#[case(InputValue::Null, false)]
	#[case(InputValue::Enum("0x0".to_string()), false)]
	#[case(InputValue::Variable("0x0".to_string()), false)]
	#[case(InputValue::list(vec![InputValue::Scalar(DefaultScalarValue::String("0x0".to_string()))]), false)]
	#[case(InputValue::<DefaultScalarValue>::Object(Default::default()), false)]
	fn is_valid_ethereum_address(#[case] input: juniper::InputValue, #[case] expect: bool) {
		assert_eq!(Address::from_input_value(&input).is_some(), expect)
	}

	#[rstest]
	fn from_h160() {
		const RAW_ADDR: &str = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045";
		let address_as_h160: H160 = RAW_ADDR.parse().unwrap();
		let address_as_eth: Address = RAW_ADDR.parse().unwrap();
		assert_eq!(Address::from(address_as_h160), address_as_eth);
	}
}
