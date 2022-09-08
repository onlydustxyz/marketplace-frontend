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
	#[error("Project does not exist")]
	NotFound(#[source] anyhow::Error),
	#[error("Something happend at the infrastructure level")]
	Infrastructure(#[source] anyhow::Error),
}

#[cfg_attr(test, automock)]
pub trait Repository: Send + Sync {
	fn store(&self, project: ProjectProjection) -> Result<(), Error>;
	fn find_by_id(&self, project_id: GithubProjectId) -> Result<ProjectProjection, Error>;
	fn list(&self) -> Result<Vec<ProjectProjection>, Error>;
}
