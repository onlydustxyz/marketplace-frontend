use mockall::automock;

use thiserror::Error;

use crate::domain::*;

#[derive(Debug, Error)]
pub enum Error {
	#[error("Contributor not found")]
	NotFound,
	#[error("Contributor contains invalid members")]
	InvalidEntity(#[source] Box<dyn std::error::Error>),
	#[error("Something happend at the infrastructure level")]
	Infrastructure(#[source] Box<dyn std::error::Error>),
}

#[automock]
pub trait Repository: Send + Sync {
	fn store(&self, contributor: Contributor) -> Result<(), Error>;
	fn update_contributor(
		&self,
		contributor_id: ContributorId,
		contributor: Contributor,
	) -> Result<(), Error>;
	fn find(&self, contributor_id: ContributorId) -> Result<Option<Contributor>, Error>;
}
