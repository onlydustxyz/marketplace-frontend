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

impl From<(Project, Vec<Contribution>)> for ProjectWithContributions {
    fn from((project, contributions): (Project, Vec<Contribution>)) -> Self {
        Self {
            id: project.id,
            owner: project.owner,
            name: project.name,
            last_indexed_time: project.last_indexed_time,
            contributions,
        }
    }
}
