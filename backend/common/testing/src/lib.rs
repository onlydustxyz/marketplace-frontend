pub mod fixtures;

use diesel::Connection;
use diesel_tracing::pg::InstrumentedPgConnection;
use r2d2_diesel::ConnectionManager;
type Pool = r2d2::Pool<ConnectionManager<InstrumentedPgConnection>>;

use infrastructure::database;

pub fn init_pool(config: &database::Config) -> Pool {
	let manager = ConnectionManager::<InstrumentedPgConnection>::new(config.url());
	let pool = Pool::builder().max_size(1).build(manager).unwrap();
	pool.get().unwrap().begin_test_transaction().unwrap();
	pool
}
