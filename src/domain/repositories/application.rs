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

pub trait Repository {
	fn store(&self, application: Application) -> Result<(), Error>;
	fn find(&self, id: &ApplicationId) -> Result<Application, Error>;
}
