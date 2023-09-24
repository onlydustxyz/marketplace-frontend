use std::str::FromStr;

use derive_getters::Getters;
use derive_more::{AsRef, Display, From, Into};
use diesel_derive_newtype::DieselNewType;
use serde::{Deserialize, Serialize};
use url::Url;

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq, Hash, PartialOrd, Ord)]
pub struct User {
	pub id: Id,
	pub login: String,
	pub avatar_url: Url,
	pub html_url: Url,
}

#[derive(Debug, Clone, Getters, Serialize, Deserialize, PartialEq, Eq, Hash, PartialOrd, Ord)]
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

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq, Hash, PartialOrd, Ord)]
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
	PartialOrd,
	Ord,
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
