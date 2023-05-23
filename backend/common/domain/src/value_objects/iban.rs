/// This module defines a wrapper type for the `iban` crate's `Iban` type, which
/// represents a valid International Bank Account Number (IBAN).
/// 
/// The `Iban` type implements various traits including `Display`, `Clone`, `Deserialize`, and `Into` for
/// easy usage and compatibility with other libraries.
/// 
/// The `Serialize` trait is also implemented to output the IBAN in electronic format instead of
/// human-readable format.
/// 
/// In addition, this module defines a custom GraphQL scalar for the `Iban` type, using the `juniper`
/// crate. This enables usage of the `Iban` type in GraphQL schemas and resolvers.
use derive_more::{Display, From, Into};
use iban::IbanLike;
use serde::{Deserialize, Serialize};

#[derive(Debug, Display, Clone, Deserialize, PartialEq, Eq, From, Into)]
pub struct Iban(iban::Iban);

// Implement Serialize to use electronic format instead of human-readable format
impl Serialize for Iban {
    /// Serializes the IBAN to a string in electronic format.
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        serializer.serialize_str(self.0.electronic_str())
    }
}

#[juniper::graphql_scalar(description = "A valid International Bank Account Number (IBAN)")]
impl<S> GraphQLScalar for Iban
where
    S: juniper::ScalarValue,
{
    /// Resolves the IBAN as a scalar value for GraphQL.
	fn resolve(&self) -> juniper::Value {
        juniper::Value::scalar(self.to_string())
    }

    /// Parses an input value into an `Iban`.
	fn from_input_value(value: &juniper::InputValue) -> Option<Iban> {
        let str_value = value.as_string_value()?;
        match str_value.parse::<iban::Iban>() {
            Ok(iban) => Some(Iban::from(iban)),
            Err(_) => None,
        }
    }

    /// Parses an input string token into a valid scalar value.
	fn from_str<'a>(value: juniper::ScalarToken<'a>) -> juniper::ParseScalarResult<'a, S> {
        <String as juniper::ParseScalarValue<S>>::from_str(value)
    }
}