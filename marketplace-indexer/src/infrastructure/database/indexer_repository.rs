use super::models;
use crate::domain::{Indexer, IndexerId, IndexerRepository, IndexerRepositoryError};
use anyhow::anyhow;
use diesel::{prelude::*, result::Error as DieselError};
use log::error;
use marketplace_infrastructure::database::{schema::indexers::dsl, Client as DatabaseClient};

impl IndexerRepository for DatabaseClient {
	fn store(&self, indexer: Indexer) -> Result<(), IndexerRepositoryError> {
		let connection = self.connection().map_err(|e| {
			error!("Unable to acquire connection from pool: {e}");
			IndexerRepositoryError::Infrastructure(anyhow!(e))
		})?;

		let indexer: models::Indexer = indexer.into();
		diesel::insert_into(dsl::indexers)
			.values(&indexer)
			.on_conflict(dsl::id)
			.do_update()
			.set(&indexer)
			.execute(&*connection)
			.map_err(|e| {
				error!("Failed while storing indexer in database: {e}");
				IndexerRepositoryError::Infrastructure(anyhow!(e))
			})?;

		Ok(())
	}

	fn find_by_id(&self, indexer_id: &IndexerId) -> Result<Indexer, IndexerRepositoryError> {
		let connection = self.connection().map_err(|e| {
			error!("Unable to acquire connection from pool: {e}");
			IndexerRepositoryError::Infrastructure(anyhow!(e))
		})?;

		let indexer: models::Indexer = dsl::indexers
			.find(indexer_id.to_string())
			.get_result(&*connection)
			.map_err(IndexerRepositoryError::from)?;

		Ok(indexer.into())
	}
}

impl From<Indexer> for models::Indexer {
	fn from(indexer: Indexer) -> Self {
		Self {
			id: indexer.id,
			index_head: indexer.index_head as i64,
		}
	}
}

impl From<models::Indexer> for Indexer {
	fn from(indexer: models::Indexer) -> Self {
		Self {
			id: indexer.id,
			index_head: indexer.index_head as u64,
		}
	}
}

impl From<DieselError> for IndexerRepositoryError {
	fn from(error: DieselError) -> Self {
		match error {
			DieselError::NotFound => Self::NotFound,
			_ => {
				error!("Database error: {error}");
				Self::Infrastructure(anyhow!(error))
			},
		}
	}
}
