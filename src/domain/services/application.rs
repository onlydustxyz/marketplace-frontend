use crate::domain::*;

use thiserror::Error;

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
	#[error("Invalid application: required: `{required}`, current: `{current}`.")]
	InvalidApplicationStatus {
		current: ApplicationStatus,
		required: ApplicationStatus,
	},
	#[error("Invalid contribution status: required: `{required}`, current: `{current}`.")]
	InvalidContributionStatus {
		current: ContributionStatus,
		required: ContributionStatus,
	},
}

pub trait Service: Send + Sync {
	fn accept_application(&self, id: &ApplicationId) -> Result<Application, Error>;
	fn apply(
		&self,
		application_id: ApplicationId,
		contribution_id: ContributionId,
		contributor_id: ContributorId,
	) -> Result<(), Error>;
}
