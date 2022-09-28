use diesel::{pg::PgConnection, prelude::*, Connection};

fn connection() -> PgConnection {
	let database_url = std::env::var("DATABASE_URL").expect("DATABASE_URL must be set");
	PgConnection::establish(&database_url).expect("Unable to connect to database")
}

pub fn count_events() -> i64 {
	use marketplace_infrastructure::database::schema::events::dsl::*;

	events
		.count()
		.first::<i64>(&connection())
		.expect("Failed while counting events")
}
