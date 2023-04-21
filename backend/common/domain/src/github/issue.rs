use std::str::FromStr;

use chrono::{DateTime, Utc};
use derive_getters::Getters;
use derive_more::{AsRef, Display, From, Into};
use derive_new::new;
use juniper::{GraphQLEnum, GraphQLObject, ParseScalarResult, ParseScalarValue, Value};
use serde::{Deserialize, Serialize};
use url::Url;

use crate::{Entity, GithubRepoId, GithubUser};

#[derive(Clone, Debug, GraphQLEnum, PartialEq, Eq)]
pub enum Status {
	Open,
	Closed,
	Merged,
	Completed,
	Cancelled,
}

#[derive(Clone, Debug, GraphQLEnum)]
pub enum Type {
	Issue,
	PullRequest,
}

#[allow(clippy::too_many_arguments)]
#[derive(Clone, Debug, new, Getters, GraphQLObject)]
pub struct Issue {
	id: Id,
	repo_id: GithubRepoId,
	number: i32,
	r#type: Type,
	title: String,
	author: GithubUser,
	html_url: Url,
	status: Status,
	created_at: DateTime<Utc>,
	merged_at: Option<DateTime<Utc>>,
	closed_at: Option<DateTime<Utc>>,
}

impl Entity for Issue {
	type Id = Id;
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
pub struct Number(i64);

impl FromStr for Number {
	type Err = <i64 as FromStr>::Err;

	fn from_str(s: &str) -> Result<Self, Self::Err> {
		i64::from_str(s).map(Into::into)
	}
}

impl From<Number> for u64 {
	fn from(value: Number) -> Self {
		value.0 as u64
	}
}

#[juniper::graphql_scalar(
	name = "GithubIssueNumber",
	description = "A GitHub issue number, represented as an integer"
)]
impl<S> GraphQLScalar for Number
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
pub struct Id(i64);

impl FromStr for Id {
	type Err = <i64 as FromStr>::Err;

	fn from_str(s: &str) -> Result<Self, Self::Err> {
		i64::from_str(s).map(Into::into)
	}
}

impl From<Id> for u64 {
	fn from(value: Id) -> Self {
		value.0 as u64
	}
}

impl From<u64> for Id {
	fn from(value: u64) -> Self {
		(value as i64).into()
	}
}

#[juniper::graphql_scalar(
	name = "GithubIssueId",
	description = "A GitHub issue id, represented as an integer"
)]
impl<S> GraphQLScalar for Id
where
	S: ScalarValue,
{
	fn resolve(&self) -> Value {
		Value::scalar::<i32>(
			self.0.try_into().expect("Inner issue id is not a valid 32-bits integer"),
		)
	}

	fn from_input_value(value: &InputValue) -> Option<Self> {
		value.as_int_value().map(|x| Self(x as i64))
	}

	fn from_str<'a>(value: ScalarToken<'a>) -> ParseScalarResult<'a, S> {
		<i32 as ParseScalarValue<S>>::from_str(value)
	}
}
