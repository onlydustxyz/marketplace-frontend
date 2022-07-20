use crate::{
    database::schema::*,
    domain::{self},
};
use diesel::Queryable;
use rocket::serde::{Deserialize, Serialize};

use super::projects::Project;

#[derive(Queryable, Identifiable, Associations, Debug, Serialize, Deserialize, Clone)]
#[belongs_to(Project)]
#[serde(crate = "rocket::serde")]
pub struct Contribution {
    pub id: String,
    pub project_id: String,
    pub status: String,
    pub transaction_hash: Option<String>,
    pub contributor_id: String,
    pub gate: i16,
    pub title: Option<String>,
    pub description: Option<String>,
    pub external_link: Option<String>,
    pub difficulty: Option<String>,
    pub technology: Option<String>,
    pub duration: Option<String>,
    pub context: Option<String>,
    pub type_: Option<String>,
}

#[derive(AsChangeset, Identifiable)]
#[table_name = "contributions"]
pub struct AssignContributionForm {
    pub id: String,
    pub status: String,
    pub contributor_id: String,
    pub transaction_hash: Option<String>,
}

#[derive(AsChangeset, Identifiable)]
#[table_name = "contributions"]
pub struct ValidateContributionForm {
    pub id: String,
    pub status: String,
    pub transaction_hash: Option<String>,
}

#[derive(AsChangeset, Identifiable)]
#[table_name = "contributions"]
pub struct ContributionContractUpdateForm {
    pub id: String,
    pub transaction_hash: String,
}

#[derive(Insertable)]
#[table_name = "contributions"]
pub struct NewContribution {
    pub id: String,
    pub project_id: String,
    pub status: String,
    pub contributor_id: String,
    pub gate: i16,
    pub transaction_hash: Option<String>,
    pub title: Option<String>,
    pub description: Option<String>,
    pub external_link: Option<String>,
    pub difficulty: Option<String>,
    pub technology: Option<String>,
    pub duration: Option<String>,
    pub context: Option<String>,
    pub type_: Option<String>,
}

impl From<domain::Contribution> for NewContribution {
    fn from(contribution: domain::Contribution) -> Self {
        Self {
            id: contribution.id,
            project_id: contribution.project_id,
            status: contribution.status.to_string(),
            contributor_id: contribution
                .contributor_id
                .map_or(String::new(), |id| id.to_string()),
            gate: contribution.gate as i16,
            transaction_hash: None,
            title: contribution.title,
            description: contribution.description,
            external_link: contribution.external_link.map(|link| link.to_string()),
            difficulty: contribution.metadata.difficulty,
            technology: contribution.metadata.technology,
            duration: contribution.metadata.duration,
            context: contribution.metadata.context,
            type_: contribution.metadata.r#type,
        }
    }
}

impl From<domain::ContractUpdateStatus> for ContributionContractUpdateForm {
    fn from(status: domain::ContractUpdateStatus) -> Self {
        Self {
            id: status.contribution_id,
            transaction_hash: status.transaction_hash,
        }
    }
}
