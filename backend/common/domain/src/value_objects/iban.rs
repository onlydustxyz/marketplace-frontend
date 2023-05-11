use derive_more::{Display, From, Into};
use iban::IbanLike;
use serde::{Deserialize, Serialize};

#[derive(Debug, Display, Clone, Deserialize, PartialEq, Eq, From, Into)]
pub struct Iban(iban::Iban);

// Implement Serialize to use electronic format instead of human-readable format
impl Serialize for Iban {
	fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
	where
		S: serde::Serializer,
	{
		serializer.serialize_str(self.0.electronic_str())
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
