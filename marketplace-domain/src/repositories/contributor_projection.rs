use crate::{ContributorAccountAddress, ContributorProfile};
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
	fn upsert(&self, contributor: ContributorProfile) -> Result<(), Error>;
	fn find_by_account_address(
		&self,
		contributor_account_address: &ContributorAccountAddress,
	) -> Result<ContributorProfile, Error>;
}
