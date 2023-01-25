use juniper::GraphQLInputObject;
use serde::{Deserialize, Serialize};

#[derive(
	Default,
	Debug,
	Clone,
	Serialize,
	Deserialize,
	GraphQLInputObject,
	AsExpression,
	FromToSql,
	FromSqlRow,
)]
#[sql_type = "diesel::sql_types::Jsonb"]
pub struct Location {
	address: Option<String>,
	post_code: Option<String>,
	city: Option<String>,
	country: Option<String>,
}
