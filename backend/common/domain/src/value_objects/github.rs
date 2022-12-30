use std::str::FromStr;

use derive_more::{AsRef, Display, From, Into};
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
