/// This module defines the database schema for the application.
pub mod schema;

#[cfg(test)]
mod tests;

mod error;
use diesel::pg::PgConnection;
pub use error::Error as DatabaseError;

mod config;
pub use config::Config;
use olog::error;
use r2d2;
use r2d2_diesel::ConnectionManager;

type Pool = r2d2::Pool<ConnectionManager<PgConnection>>;
type PooledConnection = r2d2::PooledConnection<ConnectionManager<PgConnection>>;

/// Runs any pending migrations on the given database connection pool.
///
/// # Arguments
///
/// * `pool` - A connection pool for the database.
pub fn run_migrations(pool: &Pool) {
	let connection = pool.get().expect("Unable to get connection from pool");
	diesel_migrations::run_pending_migrations(&*connection).expect("diesel migration failure");
}

/// A client for accessing the database.
pub struct Client {
	pool: Pool,
}

impl Client {
	/// Creates a new instance of `Client` using the given connection pool.
	///
	/// # Arguments
	///
	/// * `pool` - A connection pool for the database.
	pub fn new(pool: Pool) -> Self {
		Self { pool }
	}

	/// Attempts to retrieve a connection from the client's connection pool.
	///
	/// Returns:
	///  - An `Ok` variant containing a `PooledConnection` if the operation was successful.
	///  - An `Err` variant containing a `DatabaseError` if there was an error retrieving the connection.
	pub fn connection(&self) -> Result<PooledConnection, DatabaseError> {
		self.pool.get().map_err(|e| {
			error!("Failed to connect to get connection out of pool: {e}");
			DatabaseError::Connection(e.into())
		})
	}

	/// Runs any pending migrations on the client's connection pool.
	///
	/// Returns:
	///  - An `Ok` variant if the operation was successful.
	///  - An `Err` variant containing a `DatabaseError` if there was an error running the migrations.
	pub fn run_migrations(&self) -> Result<(), DatabaseError> {
		let connection = self.connection()?;
		diesel_migrations::run_pending_migrations(&*connection).map_err(|e| {
			error!("Failed to run migrations: {e}");
			DatabaseError::Migration(e.into())
		})?;
		Ok(())
	}
}

/// Creates a new connection pool for the database using the given configuration.
///
/// # Arguments
///
/// * `config` - A `Config` object containing configuration information for the database.
///
/// Returns:
///  - An `Ok` variant containing a `Pool` of connections if the operation was successful.
///  - An `Err` variant containing a `DatabaseError` if there was an error creating the connection pool.
pub fn init_pool(config: &Config) -> Result<Pool, DatabaseError> {
	let manager = ConnectionManager::<PgConnection>::new(config.url());
	let pool = Pool::builder().max_size(*config.pool_max_size()).build(manager)?;

	Ok(pool)
}