use mockall::automock;

use crate::*;
use thiserror::Error;

#[derive(Debug, Error)]
pub enum Error {
	#[error("Contribution not found")]
	NotFound,
	#[error("Contribution already exist")]
	AlreadyExist(#[source] Box<dyn std::error::Error>),
	#[error("Contribution contains invalid members")]
	InvalidEntity(#[source] Box<dyn std::error::Error>),
	#[error("Something happend at the infrastructure level")]
	Infrastructure(#[source] Box<dyn std::error::Error>),
}

#[automock]
pub trait Repository: Send + Sync {
	fn find_by_id(
		&self,
		contribution_id: &ContributionId,
	) -> Result<Option<ContributionProjection>, Error>;
	fn create(&self, contribution: ContributionProjection) -> Result<(), Error>;

	fn update_contributor_and_status(
		&self,
		contribution_id: ContributionId,
		contributor_id: Option<ContributorId>,
		status: ContributionStatus,
	) -> Result<(), Error>;

	fn update_status(
		&self,
		contribution_id: ContributionId,
		status: ContributionStatus,
	) -> Result<(), Error>;
}
