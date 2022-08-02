mod models;
mod repositories;
mod schema;

mod error;
pub use error::Error as DatabaseError;

use diesel::PgConnection;
use r2d2;
use r2d2_diesel::ConnectionManager;

type Pool = r2d2::Pool<ConnectionManager<PgConnection>>;
type PooledConnection = r2d2::PooledConnection<ConnectionManager<PgConnection>>;

pub fn run_migrations(pool: &Pool) {
	let connection = pool.get().expect("Unable to get connection from pool");
	diesel_migrations::run_pending_migrations(&*connection).expect("diesel migration failure");
}

pub struct Client {
	pool: Pool,
}

impl Client {
	fn connection(&self) -> Result<PooledConnection, DatabaseError> {
		self.pool.get().map_err(|e| DatabaseError::Connection(e.to_string()))
	}

	pub fn run_migrations(&self) -> Result<(), DatabaseError> {
		let connection = self.connection()?;
		diesel_migrations::run_pending_migrations(&*connection)
			.map_err(|e| DatabaseError::Migration(e.to_string()))?;
		Ok(())
	}
}

impl Default for Client {
	fn default() -> Self {
		Self { pool: init_pool() }
	}
}

fn init_pool() -> Pool {
	let manager = ConnectionManager::<PgConnection>::new(database_url());
	Pool::new(manager).expect("Unable to create database connection pool")
}

fn database_url() -> String {
	std::env::var("DATABASE_URL").expect("DATABASE_URL must be set")
}
