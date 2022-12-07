use derive_more::From;
use juniper::{GraphQLEnum, GraphQLInputObject};
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize, AsExpression, From, GraphQLInputObject)]
pub struct IdentityInput {
	r#type: IdentityType,
	opt_person: Option<PersonIdentity>,
	opt_company: Option<CompanyIdentity>,
}

#[derive(Debug, Clone, Serialize, Deserialize, AsExpression, FromToSql, FromSqlRow)]
#[sql_type = "diesel::sql_types::Jsonb"]
pub enum Identity {
	Company(CompanyIdentity),
	Person(PersonIdentity),
}

impl TryFrom<IdentityInput> for Identity {
	type Error = anyhow::Error;

	fn try_from(input: IdentityInput) -> Result<Self, Self::Error> {
		let typ = input.r#type;
		match typ {
			IdentityType::Company => input
				.opt_company
				.ok_or_else(|| {
					anyhow::anyhow!(
						"type was set to `COMPANY` without the matching `optCompany` field being provided"
					)
				})
				.map(Identity::Company),
			IdentityType::Person => input
				.opt_person
				.ok_or_else(|| {
					anyhow::anyhow!(
						"type was set to `PERSON` without the matching `optPerson` field being provided"
					)
				})
				.map(Identity::Person),
		}
	}
}

#[derive(Debug, Clone, Serialize, Deserialize, GraphQLInputObject)]
pub struct CompanyIdentity {
	name: String,
	id: String,
}

#[derive(Debug, Clone, Serialize, Deserialize, GraphQLInputObject)]
pub struct PersonIdentity {
	firstname: String,
	lastname: String,
}

#[derive(Debug, Clone, Serialize, Deserialize, GraphQLEnum)]
pub enum IdentityType {
	Company,
	Person,
}
