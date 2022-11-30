use std::io::Write;

use derive_more::{AsRef, Display, From, Into};
use diesel::{
	backend::Backend,
	serialize::{self, Output},
	types::ToSql,
};
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
)]
#[sql_type = "diesel::sql_types::BigInt"]
pub struct GithubRepositoryId(i64);

impl<DB> ToSql<diesel::sql_types::BigInt, DB> for GithubRepositoryId
where
	DB: Backend,
	i64: ToSql<diesel::sql_types::BigInt, DB>,
{
	fn to_sql<W: Write>(&self, out: &mut Output<W, DB>) -> serialize::Result {
		self.0.to_sql(out)
	}
}
