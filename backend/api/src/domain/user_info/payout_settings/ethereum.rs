#[cfg(test)]
use derive_more::Constructor;
use domain::EthereumAddress;
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub enum EthereumIdentity {
	Address(EthereumAddress),
	Name(EthereumName),
}

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
#[serde(transparent)]
#[cfg_attr(test, derive(Constructor))]
pub struct EthereumName(String);

impl EthereumName {
	pub fn as_str(&self) -> &str {
		self.0.as_str()
	}
}

#[juniper::graphql_scalar(description = "A ENS backed domain name")]
impl<S> GraphQLScalar for EthereumName
where
	S: juniper::ScalarValue,
{
	fn resolve(&self) -> juniper::Value {
		juniper::Value::scalar(self.0.to_owned())
	}

	fn from_input_value(value: &juniper::InputValue) -> Option<Self> {
		let str_value = value.as_string_value()?;

		if !str_value.ends_with(".eth") {
			return None;
		}

		Some(EthereumName(str_value.to_string()))
	}

	fn from_str<'a>(value: juniper::ScalarToken<'a>) -> juniper::ParseScalarResult<'a, S> {
		<String as juniper::ParseScalarValue<S>>::from_str(value)
	}
}
