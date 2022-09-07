use mockall::automock;
use thiserror::Error;

use crate::*;

#[derive(Debug, Error)]
pub enum Error {
	#[error("Member already exist")]
	AlreadyExist(#[source] anyhow::Error),
	#[error("Something happend at the infrastructure level")]
	Infrastructure(#[source] anyhow::Error),
}

#[automock]
pub trait Repository: Send + Sync {
	fn store(&self, project_member: ProjectMemberProjection) -> Result<(), Error>;
}
