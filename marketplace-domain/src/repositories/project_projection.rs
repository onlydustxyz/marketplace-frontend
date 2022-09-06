use crate::*;
#[cfg(test)]
use mockall::automock;
use thiserror::Error;

#[derive(Debug, Error)]
pub enum Error {
	#[error("Project already exist")]
	AlreadyExist(#[source] anyhow::Error),
	#[error("Project contains invalid members")]
	InvalidEntity(#[source] anyhow::Error),
	#[error("Something happend at the infrastructure level")]
	Infrastructure(#[source] anyhow::Error),
}

#[cfg_attr(test, automock)]
pub trait Repository: Send + Sync {
	fn create(&self, project: ProjectProjection) -> Result<(), Error>;
}
