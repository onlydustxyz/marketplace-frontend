use std::str::FromStr;

use chrono::{DateTime, Utc};
use derive_more::{AsRef, Display, From, Into};
use juniper::{GraphQLEnum, GraphQLObject, ParseScalarResult, ParseScalarValue, Value};
use serde::{Deserialize, Serialize};
use url::Url;

use crate::{Entity, GithubIssueNumber, GithubRepoId, GithubUser};

/// Represents the status of an issue
#[derive(
	Clone, Copy, Debug, GraphQLEnum, PartialEq, Eq, Serialize, Deserialize, AsExpression, FromToSql,
)]
#[sql_type = "diesel::sql_types::Jsonb"]
pub enum Status {
	Open,
	Closed,
	Merged,
	Completed,
	Cancelled,
}

/// Represents the type of an issue
#[derive(
	Clone, Copy, Debug, GraphQLEnum, Serialize, Deserialize, AsExpression, FromToSql, PartialEq, Eq,
)]
#[sql_type = "diesel::sql_types::Jsonb"]
pub enum Type {
	Issue,
	PullRequest,
}

/// Represents a GitHub issue
#[derive(Clone, Debug, GraphQLObject, Serialize, Deserialize, PartialEq, Eq)]
pub struct Issue {
	/// The unique ID of the issue
	pub id: Id,
	/// The ID of the GitHub repository that the issue belongs to
	pub repo_id: GithubRepoId,
	/// The number of the issue
	pub number: GithubIssueNumber,
	/// The type of the issue
	pub r#type: Type,
	/// The title of the issue
	pub title: String,
	/// The author of the issue
	pub author: GithubUser,
	/// The URL of the issue in HTML format
	pub html_url: Url,
	/// The status of the issue
	pub status: Status,
	/// The timestamp representing when the issue was created
	pub created_at: DateTime<Utc>,
	/// The timestamp representing when the issue was last updated
	pub updated_at: DateTime<Utc>,
	/// The timestamp representing when the issue was merged (if it is a Pull Request and has been merged)
	pub merged_at: Option<DateTime<Utc>>,
	/// The timestamp representing when the issue was closed (if it has been closed)
	pub closed_at: Option<DateTime<Utc>>,
}

impl Entity for Issue {
	type Id = Id;
}

/// Represents a number, used for issue IDs and numbers
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

impl From<u64> for Number {
	fn from(value: u64) -> Self {
		(value as i64).into()
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

/// Represents the ID of an issue
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