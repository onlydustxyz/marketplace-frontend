use diesel::RunQueryDsl;
use infrastructure::{database::schema::events, dbclient, dbclient::DatabaseError};

use super::Event;

pub trait Repository: Send + Sync {
	fn append(&self, event: Event) -> Result<(), DatabaseError>;
}

impl Repository for dbclient::Client {
	fn append(&self, event: Event) -> Result<(), DatabaseError> {
		let mut connection = self.connection()?;
		diesel::insert_into(events::table).values(&event).execute(&mut *connection)?;
		Ok(())
	}
}
