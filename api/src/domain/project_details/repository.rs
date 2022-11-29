#[cfg(test)]
use mockall::automock;
use thiserror::Error;

use crate::domain::ProjectDetails;

#[derive(Debug, Error)]
pub enum Error {
	#[error("Something happend at the infrastructure level")]
	Infrastructure(#[source] anyhow::Error),
}

#[cfg_attr(test, automock)]
pub trait Repository: Send + Sync {
	fn upsert(&self, project_details: ProjectDetails) -> Result<(), Error>;
}
