use crate::infrastructure::database::schema::*;
use rocket::serde::{Deserialize, Serialize};
use std::time::SystemTime;

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

#[derive(Debug, Serialize, Deserialize)]
pub struct ProjectWithContributions {
    pub id: String,
    pub owner: String,
    pub name: String,
    pub last_indexed_time: Option<SystemTime>,
    pub contributions: Vec<Contribution>,
}
