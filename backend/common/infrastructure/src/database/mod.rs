pub mod schema;

mod error;
use diesel_tracing::pg::InstrumentedPgConnection;
pub use error::Error as DatabaseError;

mod config;
pub use config::Config;
use olog::error;
use r2d2;
use r2d2_diesel::ConnectionManager;

mod mapping;
pub use mapping::Repository as MappingRepository;

type Pool = r2d2::Pool<ConnectionManager<InstrumentedPgConnection>>;
type PooledConnection = r2d2::PooledConnection<ConnectionManager<InstrumentedPgConnection>>;

pub fn run_migrations(pool: &Pool) {
	let connection = pool.get().expect("Unable to get connection from pool");
	diesel_migrations::run_pending_migrations(&*connection).expect("diesel migration failure");
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
	pub fn connection(&self) -> Result<PooledConnection, DatabaseError> {
		self.pool.get().map_err(|e| {
			error!("Failed to connect to get connection out of pool: {e}");
			DatabaseError::Connection(e.into())
		})
	}

	pub fn run_migrations(&self) -> Result<(), DatabaseError> {
		let connection = self.connection()?;
		diesel_migrations::run_pending_migrations(&*connection).map_err(|e| {
			error!("Failed to run migrations: {e}");
			DatabaseError::Migration(e.into())
		})?;
		Ok(())
	}
}

pub fn init_pool(config: &Config) -> Result<Pool, DatabaseError> {
	let manager = ConnectionManager::<InstrumentedPgConnection>::new(config.url());
	let pool = Pool::builder().max_size(*config.pool_max_size()).build(manager)?;

	Ok(pool)
}
