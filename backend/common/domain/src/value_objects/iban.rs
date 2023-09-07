use std::fmt::Display;

use derive_more::{From, FromStr, Into};
use iban::IbanLike;
use serde_with::{DeserializeFromStr, SerializeDisplay};

#[derive(
	Debug, Clone, PartialEq, Eq, From, Into, FromStr, SerializeDisplay, DeserializeFromStr,
)]
pub struct Iban(iban::Iban);

impl Display for Iban {
	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
		write!(f, "{}", self.0.electronic_str())
	}
}

#[juniper::graphql_scalar]
impl<S> GraphQLScalar for Iban
where
	S: juniper::ScalarValue,
{
	fn resolve(&self) -> juniper::Value {
		juniper::Value::scalar(self.to_string())
	}

	fn from_input_value(value: &juniper::InputValue) -> Option<Iban> {
		let str_value = value.as_string_value()?;
		match str_value.parse::<iban::Iban>() {
			Ok(iban) => Some(Iban::from(iban)),
			Err(_) => None,
		}
	}

	fn from_str<'a>(value: juniper::ScalarToken<'a>) -> juniper::ParseScalarResult<'a, S> {
		<String as juniper::ParseScalarValue<S>>::from_str(value)
	}
}
