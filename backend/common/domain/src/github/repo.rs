/// This module defines the `Repo` and `Languages` structs,
/// `Id` type, and `GraphQLScalar` implementation for GitHub repository ID.
use std::collections::HashMap;

use derive_getters::Getters;
use derive_more::{AsRef, Display, From, Into};
use derive_new::new;
use juniper::{GraphQLObject, ParseScalarResult, ParseScalarValue, Value, InputValue, ScalarToken, GraphQLScalar, ScalarValue};
use serde::{Deserialize, Serialize};
use url::Url;

use crate::Entity;

/// Represents a GitHub repository.
#[allow(clippy::too_many_arguments)]
#[derive(new, Debug, Getters, GraphQLObject, Clone, Serialize, Deserialize, Hash)]
pub struct Repo {
    /// The ID of the repository.
    id: Id,
    /// The owner of the repository.
    owner: String,
    /// The name of the repository.
    name: String,
    /// The URL of the logo of the repository.
    logo_url: Url,
    /// The URL of the repository on GitHub.
    html_url: Url,
    /// The description of the repository.
    description: String,
    /// The number of stars the repository has.
    stars: i32,
    /// The number of forks the repository has.
    forks_count: i32,
}

impl Entity for Repo {
    type Id = Id;
}

/// Represents the languages used in a GitHub repository.
#[derive(From, Into, Serialize, Deserialize)]
pub struct Languages(HashMap<String, i32>);

impl TryFrom<Languages> for serde_json::Value {
    type Error = serde_json::Error;

    fn try_from(value: Languages) -> Result<Self, Self::Error> {
        serde_json::to_value(value.0)
    }
}

/// Represents a GitHub repository ID.
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
pub struct Id(i64);

impl From<u64> for Id {
    fn from(value: u64) -> Self {
        (value as i64).into()
    }
}

/// Implements a GraphQL scalar for GitHub repository ID.
#[juniper::graphql_scalar(
    name = "GithubRepoId",
    description = "A GitHub repository ID, represented as an integer"
)]
impl<S> GraphQLScalar for Id
where
    S: ScalarValue,
{
    /// Resolves the value of the scalar.
    fn resolve(&self) -> Value {
        Value::scalar::<i32>(
            self.0.try_into().expect("Inner repository id is not a valid 32-bits integer"),
        )
    }

    /// Converts the scalar from an input value.
    fn from_input_value(value: &InputValue) -> Option<Self> {
        value.as_int_value().map(|x| Self(x as i64))
    }

    /// Converts the scalar from a string.
    fn from_str<'a>(value: ScalarToken<'a>) -> ParseScalarResult<'a, S> {
        <i32 as ParseScalarValue<S>>::from_str(value)
    }
}