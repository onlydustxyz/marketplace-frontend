pub mod create;
pub mod update;

#[cfg(test)]
mod test {
	use infrastructure::database::{ImmutableRepository, Repository, Result};
	use mockall::mock;

	use crate::models::{Sponsor, SponsorId};

	mock! {
		pub SponsorRepository {}

		impl ImmutableRepository<Sponsor> for SponsorRepository {
			fn exists(&self, id: SponsorId) -> Result<bool>;
			fn find_by_id(&self, id: SponsorId) -> Result<Sponsor>;
			fn list(&self) -> Result<Vec<Sponsor>>;
			fn insert(&self, model: Sponsor) -> Result<Sponsor>;
			fn try_insert(&self, model: Sponsor) -> Result<Option<Sponsor>>;
			fn delete(&self, id: SponsorId) -> Result<Sponsor>;
			fn clear(&self) -> Result<()>;
		}

		impl Repository<Sponsor> for SponsorRepository {
			fn update(&self, model: Sponsor) -> Result<Sponsor>;
			fn upsert(&self, model: Sponsor) -> Result<Sponsor>;
		}
	}
}
