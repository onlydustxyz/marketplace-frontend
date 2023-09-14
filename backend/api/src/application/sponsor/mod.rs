pub mod create;
pub mod update;

#[cfg(test)]
mod test {
	use domain::sponsor::Id;
	use infrastructure::database::{ImmutableRepository, Repository, Result};
	use mockall::mock;

	use crate::models::Sponsor;

	mock! {
		pub SponsorRepository {}

		impl ImmutableRepository<Sponsor> for SponsorRepository {
			fn exists(&self, id: Id) -> Result<bool>;
			fn find_by_id(&self, id: Id) -> Result<Sponsor>;
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
			fn upsert(&self, model: Sponsor) -> Result<Sponsor>;
		}
	}
}
