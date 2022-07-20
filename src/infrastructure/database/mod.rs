use diesel::PgConnection;

use crate::database::connections::pg_connection::DbConn;

// TODO remove the pub once refactoring is done
pub mod models;
mod project_repository;

pub struct Database {
    connection: DbConn,
}

impl Database {
    pub fn new(connection: DbConn) -> Self {
        Self { connection }
    }

    fn connection(&self) -> &PgConnection {
        &self.connection
    }
}
