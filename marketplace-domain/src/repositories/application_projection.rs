use mockall::automock;
use thiserror::Error;

use crate::*;

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

#[automock]
pub trait Repository: Send + Sync {
	fn insert(&self, application: ApplicationProjection) -> Result<(), Error>;
	fn delete(
		&self,
		contribution_id: &ContributionId,
		contributor_id: &ContributorId,
	) -> Result<(), Error>;
	fn delete_all_for_contribution(&self, contribution_id: &ContributionId) -> Result<(), Error>;
	fn find(
		&self,
		contribution_id: &ContributionId,
		contributor_id: &ContributorId,
	) -> Result<Option<ApplicationProjection>, Error>;
	fn list_by_contribution(
		&self,
		contribution_id: &ContributionId,
		contributor_id: Option<ContributorId>,
	) -> Result<Vec<ApplicationProjection>, Error>;
	fn list_by_contributor(
		&self,
		contributor_id: Option<ContributorId>,
	) -> Result<Vec<ApplicationProjection>, Error>;
}
