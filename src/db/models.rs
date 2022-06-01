use crate::db::schema::projects;
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
