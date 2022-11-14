#[cfg(all(test, feature = "with_e2e_tests"))]
mod e2e_tests;

pub mod fixtures;

use diesel::{Connection, PgConnection};

use r2d2_diesel::ConnectionManager;
type Pool = r2d2::Pool<ConnectionManager<PgConnection>>;

pub fn init_pool() -> Pool {
	let manager = ConnectionManager::<PgConnection>::new(database_url());
	let pool = Pool::builder().max_size(1).build(manager).unwrap();
	pool.get().unwrap().begin_test_transaction().unwrap();
	pool
}

fn database_url() -> String {
	std::env::var("DATABASE_URL").expect("DATABASE_URL must be set")
}
