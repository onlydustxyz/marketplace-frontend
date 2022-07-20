use diesel::PgConnection;

use crate::database::connections::pg_connection::DbConn;

mod project_repository;

pub struct Database {
    connection: DbConn,
}

impl Database {
    pub fn new(connection: DbConn) -> Self {
        Self { connection }
    }

    fn connection(&self) -> &PgConnection {
        &*self.connection
    }
}
