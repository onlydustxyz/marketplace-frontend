use anyhow::anyhow;
use diesel::{
	pg::PgConnection,
	r2d2::{self, ConnectionManager},
};
use diesel_migrations::EmbeddedMigrations;

pub use model::{ImmutableModel, ImmutableRepository, Model, Repository};
use olog::error;

use crate::diesel_migrations::MigrationHarness;

pub use self::{
	config::Config,
	error::{Error as DatabaseError, Result},
};

mod config;
pub mod enums;
mod error;
pub mod repositories;
pub mod schema;

mod model;
#[cfg(test)]
mod tests;

type Pool = r2d2::Pool<ConnectionManager<PgConnection>>;
type PooledConnection = r2d2::PooledConnection<ConnectionManager<PgConnection>>;

pub const MIGRATIONS: EmbeddedMigrations = embed_migrations!();

pub fn run_migrations(pool: &Pool) {
	let mut connection = pool.get().expect("Unable to get connection from pool");
	connection.run_pending_migrations(MIGRATIONS).expect("diesel migration failure");
}

pub struct Client {
	pool: Pool,
}

impl Client {
	pub fn new(pool: Pool) -> Self {
		Self { pool }
	}
}

impl Client {
	pub fn connection(&self) -> Result<PooledConnection> {
		self.pool.get().map_err(|e| {
			error!("Failed to connect to get connection out of pool: {e}");
			DatabaseError::Connection(e.into())
		})
	}

	pub fn run_migrations(&self) -> Result<()> {
		let mut connection = self.connection()?;
		connection.run_pending_migrations(MIGRATIONS).map_err(|e| {
			error!("Failed to run migrations: {e}");
			DatabaseError::Migration(anyhow!(e))
		})?;
		Ok(())
	}
}

pub fn init_pool(config: &Config) -> Result<Pool> {
	let manager = ConnectionManager::<PgConnection>::new(config.url());
	let pool = Pool::builder()
		.max_size(*config.pool_max_size())
		.build(manager)
		.map_err(|e| DatabaseError::Pool(anyhow!(e)))?;

	Ok(pool)
}
