use juniper::GraphQLInputObject;
use serde::{Deserialize, Serialize};

use super::email::Email;

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
pub struct ContactInformation {
	email: Option<Email>,
	telegram: Option<String>,
	twitter: Option<String>,
	discord: Option<String>,
}
