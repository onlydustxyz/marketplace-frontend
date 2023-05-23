/// This module defines the `IdentityInput` and `IdentityType` structs.
/// `IdentityInput` represents input data for identity information.
/// `IdentityType` represents the type of identity, which can be either `Company` or `Person`.
use derive_more::From;
use juniper::{GraphQLEnum, GraphQLInputObject};
use serde::{Deserialize, Serialize};

use crate::domain::user_info::{CompanyIdentity, Identity, PersonIdentity};

/// Represents input data for identity information.
#[derive(Debug, Clone, Serialize, Deserialize, AsExpression, From, GraphQLInputObject)]
pub struct IdentityInput {
    /// The type of identity.
    pub r#type: IdentityType,
    /// The optional person identity information.
    pub opt_person: Option<PersonIdentity>,
    /// The optional company identity information.
    pub opt_company: Option<CompanyIdentity>,
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

/// Represents the type of identity, which can be either `Company` or `Person`.
#[derive(Debug, Clone, Serialize, Deserialize, GraphQLEnum)]
pub enum IdentityType {
    /// Represents a company identity.
    Company,
    /// Represents a person identity.
    Person,
}