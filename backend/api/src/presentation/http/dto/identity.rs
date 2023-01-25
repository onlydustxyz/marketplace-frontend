use derive_more::From;
use juniper::{GraphQLEnum, GraphQLInputObject};
use serde::{Deserialize, Serialize};

use crate::domain::user_info::{CompanyIdentity, PersonIdentity};

#[derive(Debug, Clone, Serialize, Deserialize, AsExpression, From, GraphQLInputObject)]
pub struct IdentityInput {
	pub r#type: Option<IdentityType>,
	pub opt_person: Option<PersonIdentity>,
	pub opt_company: Option<CompanyIdentity>,
}

#[derive(Debug, Clone, Serialize, Deserialize, GraphQLEnum)]
pub enum IdentityType {
	Company,
	Person,
}
