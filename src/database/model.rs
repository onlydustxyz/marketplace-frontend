use std::time::SystemTime;

use crate::{database::schema::*, domain};
use diesel::Queryable;
use rocket::serde::{Deserialize, Serialize};

#[derive(Identifiable, Queryable, Debug, Serialize, Deserialize)]
#[serde(crate = "rocket::serde")]
pub struct Project {
    pub id: String,
    pub owner: String,
    pub name: String,
    pub last_indexed_time: Option<SystemTime>,
}

#[derive(Insertable)]
#[table_name = "projects"]
pub struct NewProject {
    pub id: String,
    pub owner: String,
    pub name: String,
}

#[derive(AsChangeset, Identifiable)]
#[table_name = "projects"]
pub struct ProjectIndexingStatusUpdateForm {
    pub id: String,
    pub last_indexed_time: SystemTime,
}

#[derive(Queryable, Associations, Debug, Serialize, Deserialize, Clone)]
#[belongs_to(Project)]
#[serde(crate = "rocket::serde")]
pub struct Contribution {
    pub id: String,
    pub project_id: String,
    pub status: String,
    pub transaction_hash: Option<String>,
    pub author: String,
}

#[derive(AsChangeset, Identifiable)]
#[table_name = "contributions"]
pub struct ContributionForm {
    pub id: String,
    pub status: String,
    pub author: String,
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
    pub author: String,
}

impl From<domain::Contribution> for NewContribution {
    fn from(contribution: domain::Contribution) -> Self {
        Self {
            id: contribution.id,
            project_id: contribution.project_id,
            status: contribution.status.to_string(),
            author: contribution.author,
        }
    }
}

impl From<domain::Contribution> for ContributionForm {
    fn from(contribution: domain::Contribution) -> Self {
        Self {
            id: contribution.id,
            status: contribution.status.to_string(),
            author: contribution.author,
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

impl From<Project> for domain::Project {
    fn from(project: Project) -> Self {
        Self {
            id: project.id,
            name: project.name,
            owner: project.owner,
        }
    }
}

impl From<domain::Project> for NewProject {
    fn from(project: domain::Project) -> Self {
        Self {
            id: project.id,
            name: project.name,
            owner: project.owner,
        }
    }
}

impl From<domain::IndexingStatus> for ProjectIndexingStatusUpdateForm {
    fn from(status: domain::IndexingStatus) -> Self {
        Self {
            id: status.project_id,
            last_indexed_time: status.last_update_time,
        }
    }
}

impl From<Contribution> for domain::Contribution {
    fn from(contribution: Contribution) -> Self {
        Self {
            id: contribution.id,
            author: contribution.author,
            project_id: contribution.project_id,
            status: contribution.status.parse().unwrap(),
        }
    }
}
