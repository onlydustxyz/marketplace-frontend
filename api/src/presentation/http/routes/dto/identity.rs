use derive_more::From;
use juniper::{GraphQLEnum, GraphQLInputObject};
use serde::{Deserialize, Serialize};

use crate::domain::user_info::{CompanyIdentity, Identity, PersonIdentity};

#[derive(Debug, Clone, Serialize, Deserialize, AsExpression, From, GraphQLInputObject)]
pub struct IdentityInput {
	r#type: IdentityType,
	opt_person: Option<PersonIdentity>,
	opt_company: Option<CompanyIdentity>,
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

#[derive(Debug, Clone, Serialize, Deserialize, GraphQLEnum)]
pub enum IdentityType {
	Company,
	Person,
}
