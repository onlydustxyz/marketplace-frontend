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
