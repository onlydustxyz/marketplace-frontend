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
	number: String,
	street: String,
	post_code: String,
	city: String,
	country: String,
}
