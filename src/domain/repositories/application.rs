use thiserror::Error;

use crate::domain::*;

#[derive(Debug, Error)]
pub enum Error {
	#[error("Application not found")]
	NotFound,
	#[error("Application already exist")]
	AlreadyExist(#[source] Box<dyn std::error::Error>),
	#[error("Application contains invalid members")]
	InvalidEntity(#[source] Box<dyn std::error::Error>),
	#[error("Something happend at the infrastructure level")]
	Infrastructure(#[source] Box<dyn std::error::Error>),
}

pub trait Repository: Send + Sync {
	fn store(&self, application: Application) -> Result<(), Error>;
	fn find(&self, id: &ApplicationId) -> Result<Option<Application>, Error>;
	fn list_by_contribution(
		&self,
		contribution_id: &ContributionId,
		contributor_id: Option<&ContributorId>,
	) -> Result<Vec<Application>, Error>;
	fn list_by_contributor(
		&self,
		contributor_id: &ContributorId,
	) -> Result<Vec<Application>, Error>;
}
