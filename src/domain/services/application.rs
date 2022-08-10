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
	#[error(
		"The current contribution status, `{0}`, does not allow it to recieve new applications"
	)]
	InvalidContributionStatus(ContributionStatus),
}

pub trait Service: Send + Sync {
	fn accept_application(&self, id: &ApplicationId) -> Result<Application, Error>;
}
