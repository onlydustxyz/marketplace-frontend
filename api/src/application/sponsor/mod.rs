use infrastructure::dbclient::DatabaseError;
use thiserror::Error;

use crate::domain::ImageStoreServiceError;

pub mod create;
pub mod update;

#[derive(Debug, Error)]
pub enum Error {
	#[error(transparent)]
	ImageStore(#[from] ImageStoreServiceError),
	#[error("Unable to store sponsor")]
	Database(#[from] DatabaseError),
}

#[cfg(test)]
mod test {
	use domain::sponsor::Id;
	use infrastructure::dbclient::{ImmutableRepository, Repository, Result};
	use mockall::mock;

	use crate::models::Sponsor;

	mock! {
		pub SponsorRepository {}

		impl ImmutableRepository<Sponsor> for SponsorRepository {
			fn exists(&self, id: Id) -> Result<bool>;
			fn find_by_id(&self, id: Id) -> Result<Sponsor>;
			fn try_find_by_id(&self, id: Id) -> Result<Option<Sponsor>>;
			fn list(&self) -> Result<Vec<Sponsor>>;
			fn insert(&self, model: Sponsor) -> Result<Sponsor>;
			fn try_insert(&self, model: Sponsor) -> Result<Option<Sponsor>>;
			fn delete(&self, id: Id) -> Result<Option<Sponsor>>;
			fn clear(&self) -> Result<()>;
			fn insert_all(&self, models: Vec<Sponsor>) -> Result<()>;
			fn try_insert_all(&self, models: Vec<Sponsor>) -> Result<()>;
		}

		impl Repository<Sponsor> for SponsorRepository {
			fn update(&self, model: Sponsor) -> Result<Sponsor>;
			fn update_all(&self, models: Vec<Sponsor>) -> Result<()>;
			fn upsert(&self, model: Sponsor) -> Result<Sponsor>;
		}
	}
}
