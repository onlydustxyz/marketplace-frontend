use derive_more::{AsRef, Display, From, Into};
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
)]
#[sql_type = "diesel::sql_types::Uuid"]
pub struct Id(Uuid);
