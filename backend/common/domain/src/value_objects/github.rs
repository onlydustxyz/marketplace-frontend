use std::str::FromStr;

use derive_more::{AsRef, Display, From, Into};
use juniper::{ParseScalarResult, ParseScalarValue, Value};
use serde::{Deserialize, Serialize};

#[derive(
	Debug,
	Clone,
	Copy,
	Default,
	Serialize,
	Deserialize,
	PartialEq,
	Eq,
	Display,
	From,
	Into,
	AsRef,
	Hash,
	AsExpression,
	FromToSql,
	FromSqlRow,
)]
#[sql_type = "diesel::sql_types::BigInt"]
pub struct GithubRepositoryId(i64);

#[juniper::graphql_scalar(
	name = "GithubRepositoryId",
	description = "A GitHub repository ID, represented as an integer"
)]
impl<S> GraphQLScalar for GithubRepositoryId
where
	S: ScalarValue,
{
	fn resolve(&self) -> Value {
		Value::scalar::<i32>(
			self.0.try_into().expect("Inner repository id is not a valid 32-bits integer"),
		)
	}

	fn from_input_value(value: &InputValue) -> Option<Self> {
		value.as_int_value().map(|x| Self(x as i64))
	}

	fn from_str<'a>(value: ScalarToken<'a>) -> ParseScalarResult<'a, S> {
		<i32 as ParseScalarValue<S>>::from_str(value)
	}
}

#[derive(
	Debug,
	Clone,
	Copy,
	Default,
	Serialize,
	Deserialize,
	PartialEq,
	Eq,
	Hash,
	Display,
	From,
	Into,
	AsRef,
	AsExpression,
	FromToSql,
	FromSqlRow,
)]
#[sql_type = "diesel::sql_types::BigInt"]
pub struct GithubUserId(i64);

impl FromStr for GithubUserId {
	type Err = <i64 as FromStr>::Err;

	fn from_str(s: &str) -> Result<Self, Self::Err> {
		i64::from_str(s).map(Into::into)
	}
}

#[derive(
	Debug,
	Clone,
	Copy,
	Default,
	Serialize,
	Deserialize,
	PartialEq,
	Eq,
	Hash,
	Display,
	From,
	Into,
	AsRef,
	AsExpression,
	FromToSql,
	FromSqlRow,
)]
#[sql_type = "diesel::sql_types::BigInt"]
pub struct GithubIssueNumber(i64);

impl FromStr for GithubIssueNumber {
	type Err = <i64 as FromStr>::Err;

	fn from_str(s: &str) -> Result<Self, Self::Err> {
		i64::from_str(s).map(Into::into)
	}
}

#[juniper::graphql_scalar(
	name = "GithubIssueNumber",
	description = "A GitHub issue number, represented as an integer"
)]
impl<S> GraphQLScalar for GithubIssueNumber
where
	S: ScalarValue,
{
	fn resolve(&self) -> Value {
		Value::scalar::<i32>(
			self.0.try_into().expect("Inner issue number is not a valid 32-bits integer"),
		)
	}

	fn from_input_value(value: &InputValue) -> Option<Self> {
		value.as_int_value().map(|x| Self(x as i64))
	}

	fn from_str<'a>(value: ScalarToken<'a>) -> ParseScalarResult<'a, S> {
		<i32 as ParseScalarValue<S>>::from_str(value)
	}
}
