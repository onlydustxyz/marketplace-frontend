pub mod schema;

use crate::domain::{self};
use diesel::prelude::*;
use itertools::Itertools;
use std::sync::{Mutex, MutexGuard};

use self::schema::projects::dsl::*;
use crate::infrastructure::database::{models as db_model, Connection as DbConn, ConnectionPool};

pub struct API {
    connection: Mutex<DbConn>,
}

impl API {
    pub fn new(pool: &ConnectionPool) -> Self {
        API {
            connection: Mutex::new(DbConn::from_pool(pool)),
        }
    }

    fn connection(&self) -> MutexGuard<'_, DbConn> {
        self.connection.lock().unwrap()
    }

    pub fn find_projects_by_owner_and_name(
        &self,
        project_owner: &str,
        project_name: &str,
    ) -> impl Iterator<Item = domain::Project> {
        let results = projects
            .filter(owner.eq(project_owner))
            .filter(name.eq(project_name))
            .load::<db_model::Project>(&**self.connection())
            .expect("Error while fetching projects from database");

        results.into_iter().map_into()
    }

    pub fn find_projects(
        &self,
        filter: &domain::ProjectFilter,
    ) -> impl Iterator<Item = domain::Project> {
        let mut query = projects.into_boxed();

        if let Some(owner_) = &filter.owner {
            query = query.filter(owner.eq(owner_));
        };

        if let Some(name_) = &filter.name {
            query = query.filter(name.eq(name_));
        };

        let results = query
            .load::<db_model::Project>(&**self.connection())
            .expect("Error while fetching projects from database");

        results.into_iter().map_into()
    }
}
