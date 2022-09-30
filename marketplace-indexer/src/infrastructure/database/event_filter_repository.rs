use super::models;
use crate::domain::{EventFilter, EventFilterRepository, EventFilterRepositoryError};
use anyhow::anyhow;
use diesel::{
	dsl::*,
	prelude::*,
	result::{DatabaseErrorKind, Error as DieselError},
};
use log::error;
use marketplace_infrastructure::database::{schema::event_filters::dsl, Client as DatabaseClient};

impl EventFilterRepository for DatabaseClient {
	fn insert_if_not_exist(
		&self,
		event_filter: EventFilter,
	) -> Result<(), EventFilterRepositoryError> {
		let connection = self.connection().map_err(|e| {
			error!("Unable to acquire connection from pool: {e}");
			EventFilterRepositoryError::Infrastructure(anyhow!(e))
		})?;

		let event_filter: models::EventFilter = event_filter.into();
		diesel::insert_into(dsl::event_filters)
			.values(&event_filter)
			.on_conflict_do_nothing()
			.execute(&*connection)
			.map_err(|e| {
				error!("Failed while storing event filter in database: {e}");
				match e {
					DieselError::DatabaseError(kind, _) => match kind {
						DatabaseErrorKind::UniqueViolation =>
							EventFilterRepositoryError::AlreadyExists(anyhow!(e)),
						_ => EventFilterRepositoryError::Infrastructure(anyhow!(e)),
					},
					_ => EventFilterRepositoryError::Infrastructure(anyhow!(e)),
				}
			})?;

		Ok(())
	}

	fn matches(&self, event_filter: &EventFilter) -> Result<bool, EventFilterRepositoryError> {
		let connection = self.connection().map_err(|e| {
			error!("Unable to acquire connection from pool: {e}");
			EventFilterRepositoryError::Infrastructure(anyhow!(e))
		})?;

		diesel::select(exists(
			dsl::event_filters
				.filter(dsl::indexer_id.eq(event_filter.indexer_id.to_string()))
				.filter(dsl::source_contract.eq(event_filter.source_contract.to_string())),
		))
		.get_result(&*connection)
		.map_err(|e| {
			error!("Failed while searching for event filter in database: {e}");
			EventFilterRepositoryError::Infrastructure(anyhow!(e))
		})
	}
}

impl From<EventFilter> for models::EventFilter {
	fn from(filter: EventFilter) -> Self {
		Self {
			indexer_id: filter.indexer_id.to_string(),
			source_contract: filter.source_contract.to_string(),
		}
	}
}
