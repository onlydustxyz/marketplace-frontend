use juniper::GraphQLInputObject;
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize, AsExpression, FromToSql, FromSqlRow)]
#[sql_type = "diesel::sql_types::Jsonb"]
pub enum Identity {
	Company(CompanyIdentity),
	Person(PersonIdentity),
}

#[derive(Default, Debug, Clone, Serialize, Deserialize, GraphQLInputObject)]
pub struct CompanyIdentity {
	name: String,
}

#[derive(Default, Debug, Clone, Serialize, Deserialize, GraphQLInputObject)]
pub struct PersonIdentity {
	firstname: String,
	lastname: String,
}
