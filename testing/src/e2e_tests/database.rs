use diesel::{pg::PgConnection, prelude::*, Connection};
use diesel_migrations;
use rstest::*;

fn connection() -> PgConnection {
	let database_url = std::env::var("DATABASE_URL").expect("DATABASE_URL must be set");
	PgConnection::establish(&database_url).expect("Unable to connect to database")
}

pub fn get_events_count() -> i64 {
	use infrastructure::database::schema::events::dsl::*;

	events
		.count()
		.first::<i64>(&connection())
		.expect("Failed while counting events")
}

#[fixture]
#[once]
pub fn migrated_database() {
	diesel_migrations::run_pending_migrations(&connection())
		.expect("Failed while running database migrations");
}
