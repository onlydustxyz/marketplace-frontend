use mockall::automock;
use thiserror::Error;

use crate::{Project, ProjectId};

#[derive(Debug, Error)]
pub enum Error {
	#[error("Project does not exist")]
	NotFound,
	#[error("Project already exists")]
	AlreadyExist(#[source] anyhow::Error),
	#[error("Something happend at the infrastructure level")]
	Infrastructure(#[source] anyhow::Error),
}

#[automock]
pub trait Repository: Send + Sync {
	fn insert(&self, project: Project) -> Result<(), Error>;
	fn find(&self, id: ProjectId) -> Result<Project, Error>;
}
