use derive_more::{AsRef, Display, From, FromStr, Into};
use serde::{Deserialize, Serialize};
use uuid::Uuid;

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
	FromStr,
)]
#[sql_type = "diesel::sql_types::Uuid"]
pub struct Id(Uuid);

impl Id {
	pub fn new() -> Self {
		Self(Uuid::new_v4())
	}
}
