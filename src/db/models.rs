use crate::db::schema::{projects, pull_requests};
use diesel::Queryable;
use rocket::serde::{Deserialize, Serialize};

#[derive(Queryable, Debug, Serialize, Deserialize)]
#[serde(crate = "rocket::serde")]
pub struct Project {
    pub id: i32,
    pub organisation: String,
    pub repository: String,
}

#[derive(Insertable)]
#[table_name = "projects"]
pub struct NewProject {
    pub organisation: String,
    pub repository: String,
}

#[derive(Queryable, Debug, Serialize, Deserialize, Clone)]
#[serde(crate = "rocket::serde")]
pub struct PullRequest {
    pub id: String,
    pub pr_status: String,
    pub pr_smart_contract_status: String,
    pub author: String,
}

#[derive(AsChangeset, Identifiable)]
#[table_name = "pull_requests"]
pub struct PullRequestForm {
    pub id: String,
    pub pr_status: String,
    pub pr_smart_contract_status: String,
    pub author: String,
}

#[derive(Insertable)]
#[table_name = "pull_requests"]
pub struct NewPullRequest {
    pub id: String,
    pub pr_status: String,
    pub pr_smart_contract_status: String,
    pub author: String,
}
