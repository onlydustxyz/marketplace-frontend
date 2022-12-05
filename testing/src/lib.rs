pub mod fixtures;

use diesel::{Connection, PgConnection};
use infrastructure::config;
use r2d2_diesel::ConnectionManager;

type Pool = r2d2::Pool<ConnectionManager<PgConnection>>;

pub fn init_pool() -> Pool {
	let manager = ConnectionManager::<PgConnection>::new(database_url());
	let pool = Pool::builder().max_size(1).build(manager).unwrap();
	pool.get().unwrap().begin_test_transaction().unwrap();
	pool
}

fn database_url() -> String {
	config::load().expect("Unable to load configuration").database.url
}
