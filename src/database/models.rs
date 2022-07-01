use std::time::SystemTime;

use crate::{
    database::schema::{projects, pull_requests},
    model::{pullrequest, repository},
    starknet::models::ContractUpdateStatus,
};
use diesel::Queryable;
use rocket::serde::{Deserialize, Serialize};

#[derive(Identifiable, Queryable, Debug, Serialize, Deserialize)]
#[serde(crate = "rocket::serde")]
pub struct Project {
    pub id: String,
    pub organisation: String,
    pub repository: String,
    pub last_indexed_time: Option<SystemTime>,
}

#[derive(Insertable)]
#[table_name = "projects"]
pub struct NewProject {
    pub id: String,
    pub organisation: String,
    pub repository: String,
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
pub struct PullRequest {
    pub id: String,
    pub project_id: String,
    pub pr_status: String,
    pub smart_contract_update_time: Option<String>,
    pub author: String,
}

#[derive(AsChangeset, Identifiable)]
#[table_name = "pull_requests"]
pub struct PullRequestForm {
    pub id: String,
    pub pr_status: String,
    pub author: String,
}

#[derive(AsChangeset, Identifiable)]
#[table_name = "pull_requests"]
pub struct PullRequestContractUpdateForm {
    pub id: String,
    pub transaction_hash: String,
}

#[derive(Insertable)]
#[table_name = "pull_requests"]
pub struct NewPullRequest {
    pub id: String,
    pub project_id: String,
    pub pr_status: String,
    pub author: String,
}

impl From<pullrequest::PullRequest> for NewPullRequest {
    fn from(pr: pullrequest::PullRequest) -> Self {
        Self {
            id: pr.id,
            project_id: pr.repository_id,
            pr_status: pr.status.to_string(),
            author: pr.author,
        }
    }
}

impl From<pullrequest::PullRequest> for PullRequestForm {
    fn from(pr: pullrequest::PullRequest) -> Self {
        Self {
            id: pr.id,
            pr_status: pr.status.to_string(),
            author: pr.author,
        }
    }
}

impl From<ContractUpdateStatus> for PullRequestContractUpdateForm {
    fn from(status: ContractUpdateStatus) -> Self {
        Self {
            id: status.pr_id,
            transaction_hash: status.transaction_hash,
        }
    }
}

impl From<Project> for repository::Repository {
    fn from(project: Project) -> Self {
        Self {
            id: project.id,
            name: project.repository,
            owner: project.organisation,
        }
    }
}

impl From<repository::Repository> for NewProject {
    fn from(repo: repository::Repository) -> Self {
        Self {
            id: repo.id,
            repository: repo.name,
            organisation: repo.owner,
        }
    }
}

impl From<repository::IndexingStatus> for ProjectIndexingStatusUpdateForm {
    fn from(status: repository::IndexingStatus) -> Self {
        Self {
            id: status.repository_id,
            last_indexed_time: status.last_update_time,
        }
    }
}

impl From<PullRequest> for pullrequest::PullRequest {
    fn from(pr: PullRequest) -> Self {
        Self {
            id: pr.id,
            author: pr.author,
            repository_id: pr.project_id,
            status: pr.pr_status.parse().unwrap(),
        }
    }
}
