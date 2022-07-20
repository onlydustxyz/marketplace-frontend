use std::time::SystemTime;

use crate::{database::schema::*, domain};
use diesel::Queryable;
use rocket::serde::{Deserialize, Serialize};

use super::Contribution;

#[derive(Identifiable, Queryable, Debug, Serialize, Deserialize)]
#[serde(crate = "rocket::serde")]
pub struct Project {
    pub id: String,
    pub owner: String,
    pub name: String,
    pub last_indexed_time: Option<SystemTime>,
}

#[derive(Insertable, AsChangeset)]
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

#[derive(Debug, Serialize, Deserialize)]
pub struct ProjectWithContributions {
    pub id: String,
    pub owner: String,
    pub name: String,
    pub last_indexed_time: Option<SystemTime>,
    pub contributions: Vec<Contribution>,
}

impl From<domain::IndexingStatus> for ProjectIndexingStatusUpdateForm {
    fn from(status: domain::IndexingStatus) -> Self {
        Self {
            id: status.project_id,
            last_indexed_time: status.last_update_time,
        }
    }
}
