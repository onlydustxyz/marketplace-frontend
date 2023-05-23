use juniper::GraphQLEnum;
use serde::{Deserialize, Serialize};

#[derive(
	Debug,
	Default,
	Clone,
	Serialize,
	Deserialize,
	AsExpression,
	FromToSql,
	FromSqlRow,
	PartialEq,
	Eq,
	GraphQLEnum,
)]
#[sql_type = "diesel::sql_types::Jsonb"]
pub enum Visibility {
	Private,
	#[default]
	Public,
}
