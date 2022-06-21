use std::time::SystemTime;

use crate::database::schema::{projects, pull_requests};
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
    pub smart_contract_update_time: String,
}

#[derive(Insertable)]
#[table_name = "pull_requests"]
pub struct NewPullRequest {
    pub id: String,
    pub project_id: String,
    pub pr_status: String,
    pub author: String,
}
