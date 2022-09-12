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
	fn create(&self, application: ApplicationProjection) -> Result<(), Error>;
	fn update(&self, application: ApplicationProjection) -> Result<(), Error>;
	fn find(&self, id: &ApplicationId) -> Result<Option<ApplicationProjection>, Error>;
	fn find_by_contribution_and_contributor(
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
	fn for_a_contribution_set_all_status(
		&self,
		contribution_id: &ContributionId,
		status: ApplicationStatus,
	) -> Result<(), Error>;
	fn for_a_contribution_set_one_to_a_status_and_all_others_to_another(
		&self,
		contribution_id: &ContributionId,
		contributor_id: &ContributorId,
		status_for_the_distinct: ApplicationStatus,
		status_for_all: ApplicationStatus,
	) -> Result<(), Error>;
}
