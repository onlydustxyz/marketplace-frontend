use derive_more::Constructor;
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize, Constructor)]
#[serde(transparent)]
pub struct Name(String);

impl Name {
	pub fn as_str(&self) -> &str {
		self.0.as_str()
	}
}

impl ToString for Name {
	fn to_string(&self) -> String {
		self.0.to_string()
	}
}

#[juniper::graphql_scalar(description = "A ENS backed domain name")]
impl<S> GraphQLScalar for Name
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

		Some(Name(str_value.to_string()))
	}

	fn from_str<'a>(value: juniper::ScalarToken<'a>) -> juniper::ParseScalarResult<'a, S> {
		<String as juniper::ParseScalarValue<S>>::from_str(value)
	}
}
