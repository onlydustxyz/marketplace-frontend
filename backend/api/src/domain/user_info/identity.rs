/// This module defines structures related to identity and serialization in GraphQL API
use juniper::GraphQLInputObject;
use serde::{Deserialize, Serialize};

/// Identity enumeration representing either a Company or Person Identity
#[derive(Debug, Clone, Serialize, Deserialize, AsExpression, FromToSql, FromSqlRow)]
#[sql_type = "diesel::sql_types::Jsonb"]
pub enum Identity {
	Company(CompanyIdentity),
	Person(PersonIdentity),
}

/// Structure representing a Company Identity
#[derive(Default, Debug, Clone, Serialize, Deserialize, GraphQLInputObject)]
pub struct CompanyIdentity {
	/// An optional owner of the company as a Person Identity
	owner: Option<PersonIdentity>,
	/// An optional name of the company
	name: Option<String>,
	/// An optional identification number of the company
	identification_number: Option<String>,
}

/// Structure representing a Person Identity
#[derive(Default, Debug, Clone, Serialize, Deserialize, GraphQLInputObject)]
pub struct PersonIdentity {
	/// An optional first name of the person
	firstname: Option<String>,
	/// An optional last name of the person
	lastname: Option<String>,
}