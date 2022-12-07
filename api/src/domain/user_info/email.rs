use std::str::FromStr;

use derive_more::From;
use email_address::EmailAddress;
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize, AsExpression, From, FromToSql, FromSqlRow)]
#[sql_type = "diesel::sql_types::Text"]
#[serde(transparent)]
pub struct Email(String);

#[juniper::graphql_scalar(description = "A valid email address")]
impl<S> GraphQLScalar for Email
where
	S: juniper::ScalarValue,
{
	fn resolve(&self) -> juniper::Value {
		juniper::Value::scalar(self.0.to_owned())
	}

	fn from_input_value(value: &juniper::InputValue) -> Option<Self> {
		let str_value = value.as_string_value()?;
		EmailAddress::from_str(str_value).map(|email| Email(email.to_string())).ok()
	}

	fn from_str<'a>(value: juniper::ScalarToken<'a>) -> juniper::ParseScalarResult<'a, S> {
		<String as juniper::ParseScalarValue<S>>::from_str(value)
	}
}
