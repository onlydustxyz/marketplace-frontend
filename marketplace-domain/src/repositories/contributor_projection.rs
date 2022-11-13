use crate::ContributorProfile;
#[cfg(test)]
use mockall::automock;
use thiserror::Error;
use uuid::Uuid;

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
	fn upsert_github_user_data(&self, contributor: ContributorProfile) -> Result<(), Error>;
	fn upsert_discord_handle(&self, contributor: ContributorProfile) -> Result<(), Error>;
	fn find_by_id(&self, id: &Uuid) -> Result<ContributorProfile, Error>;
}
