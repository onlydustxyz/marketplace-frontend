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
	owner: Option<PersonIdentity>,
	name: Option<String>,
	identification_number: Option<String>,
}

#[derive(Default, Debug, Clone, Serialize, Deserialize, GraphQLInputObject)]
pub struct PersonIdentity {
	firstname: Option<String>,
	lastname: Option<String>,
}
