use std::str::FromStr;

use chrono::{DateTime, Utc};
use derive_more::{AsRef, Display, From, Into};
use diesel_derive_newtype::DieselNewType;
use juniper::{GraphQLEnum, GraphQLObject, ParseScalarResult, ParseScalarValue, Value};
use serde::{Deserialize, Serialize};
use url::Url;

use crate::{Entity, GithubIssueNumber, GithubRepoId, GithubUser};

#[derive(Clone, Copy, Debug, GraphQLEnum, PartialEq, Eq, Serialize, Deserialize)]
pub enum Status {
	Open,
	Closed,
	Merged,
	Completed,
	Cancelled,
}

#[derive(Clone, Copy, Debug, GraphQLEnum, Serialize, Deserialize, PartialEq, Eq)]
pub enum Type {
	Issue,
	PullRequest,
}

#[derive(Clone, Debug, GraphQLObject, Serialize, Deserialize, PartialEq, Eq)]
pub struct Issue {
	pub id: Id,
	pub repo_id: GithubRepoId,
	pub number: GithubIssueNumber,
	pub r#type: Type,
	pub title: String,
	pub author: GithubUser,
	pub html_url: Url,
	pub status: Status,
	pub created_at: DateTime<Utc>,
	pub updated_at: DateTime<Utc>,
	pub merged_at: Option<DateTime<Utc>>,
	pub closed_at: Option<DateTime<Utc>>,
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
	DieselNewType,
)]
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
	DieselNewType,
)]
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
