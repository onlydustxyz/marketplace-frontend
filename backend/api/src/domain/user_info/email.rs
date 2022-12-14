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
		if EmailAddress::is_valid(str_value) {
			Some(Email(str_value.to_string()))
		} else {
			None
		}
	}

	fn from_str<'a>(value: juniper::ScalarToken<'a>) -> juniper::ParseScalarResult<'a, S> {
		<String as juniper::ParseScalarValue<S>>::from_str(value)
	}
}
#[cfg(test)]
mod test {
	use juniper::{DefaultScalarValue, FromInputValue, InputValue};
	use rstest::rstest;

	use super::Email;

	#[rstest]
	#[case(InputValue::Scalar(DefaultScalarValue::String("abc42@gmail.com".to_string())), true)]
	#[case(InputValue::Scalar(DefaultScalarValue::String("aBc@gMail.coM".to_string())), true)]
	#[case(InputValue::Scalar(DefaultScalarValue::String("abc@gmail".to_string())), true)]
	#[case(InputValue::Scalar(DefaultScalarValue::String("jsmith@[192.168.2.1]".to_string())), true)]
	#[case(InputValue::Scalar(DefaultScalarValue::String("abcgmail.com".to_string())), false)]
	#[case(InputValue::Scalar(DefaultScalarValue::String("".to_string())), false)]
	#[case(InputValue::Scalar(DefaultScalarValue::Int(42)), false)]
	#[case(InputValue::Scalar(DefaultScalarValue::Float(4.2)), false)]
	#[case(InputValue::Scalar(DefaultScalarValue::Boolean(true)), false)]
	#[case(InputValue::Null, false)]
	#[case(InputValue::Enum("abc@gmail.com".to_string()), false)]
	#[case(InputValue::Variable("abc@gmail.com".to_string()), false)]
	#[case(InputValue::list(vec![InputValue::Scalar(DefaultScalarValue::String("abc42@gmail.com".to_string()))]), false)]
	#[case(InputValue::<DefaultScalarValue>::Object(Default::default()), false)]
	fn is_valid_email(#[case] input: InputValue, #[case] expected: bool) {
		assert_eq!(Email::from_input_value(&input).is_some(), expected)
	}
}
