pub mod fixtures;

use diesel::{Connection, PgConnection};

use r2d2_diesel::ConnectionManager;
type Pool = r2d2::Pool<ConnectionManager<PgConnection>>;

use infrastructure::database;

pub fn init_pool(config: &database::Config) -> Pool {
	let manager = ConnectionManager::<PgConnection>::new(config.url());
	let pool = Pool::builder().max_size(1).build(manager).unwrap();
	pool.get().unwrap().begin_test_transaction().unwrap();
	pool
}
