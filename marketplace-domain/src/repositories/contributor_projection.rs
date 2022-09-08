use crate::{ContributorId, ContributorProjection};
#[cfg(test)]
use mockall::automock;
use thiserror::Error;

#[derive(Debug, Error)]
pub enum Error {
	#[error("Contributor not found")]
	NotFound,
	#[error("Contributor already exist")]
	AlreadyExist(#[source] anyhow::Error),
	#[error("Contributor contains invalid members")]
	InvalidEntity(#[source] anyhow::Error),
	#[error("Something happend at the infrastructure level")]
	Infrastructure(#[source] anyhow::Error),
}

#[cfg_attr(test, automock)]
pub trait Repository: Send + Sync {
	fn store(&self, contributor: ContributorProjection) -> Result<(), Error>;
	fn find_by_id(&self, contributor_id: &ContributorId) -> Result<ContributorProjection, Error>;
}
