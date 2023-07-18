use std::str::FromStr;

use derive_getters::Getters;
use derive_more::{AsRef, Display, From, Into};
use derive_new::new;
use diesel_derive_newtype::DieselNewType;
use juniper::{GraphQLObject, ParseScalarResult, ParseScalarValue, Value};
use serde::{Deserialize, Serialize};
use url::Url;

#[derive(
	new, Debug, Clone, Getters, GraphQLObject, Serialize, Deserialize, PartialEq, Eq, Hash,
)]
pub struct User {
	pub id: Id,
	pub login: String,
	pub avatar_url: Url,
	pub html_url: Url,
}

#[derive(Debug, Clone, Getters, GraphQLObject, Serialize, Deserialize, PartialEq, Eq, Hash)]
pub struct FullUser {
	pub id: Id,
	pub login: String,
	pub avatar_url: Url,
	pub html_url: Url,
	pub bio: Option<String>,
	pub location: Option<String>,
	pub blog: Option<String>,
	#[serde(default)]
	pub social_accounts: Vec<SocialAccount>,
}

impl FullUser {
	pub fn get_social_account_url(&self, provider: &str) -> Option<String> {
		self.social_accounts
			.iter()
			.find(|social_account| social_account.provider == provider)
			.map(|social_account| social_account.url.clone())
	}
}

#[derive(Debug, Clone, Getters, GraphQLObject, Serialize, Deserialize, PartialEq, Eq, Hash)]
pub struct SocialAccount {
	pub provider: String,
	pub url: String,
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

impl From<u64> for Id {
	fn from(value: u64) -> Self {
		(value as i64).into()
	}
}

#[juniper::graphql_scalar(
	name = "GithubUserId",
	description = "A GitHub user ID, represented as an integer"
)]
impl<S> GraphQLScalar for Id
where
	S: ScalarValue,
{
	fn resolve(&self) -> Value {
		Value::scalar::<i32>(
			self.0.try_into().expect("Inner user id is not a valid 32-bits integer"),
		)
	}

	fn from_input_value(value: &InputValue) -> Option<Self> {
		value.as_int_value().map(|x| Self(x as i64))
	}

	fn from_str<'a>(value: ScalarToken<'a>) -> ParseScalarResult<'a, S> {
		<i32 as ParseScalarValue<S>>::from_str(value)
	}
}
