use mockall::automock;
use thiserror::Error;
use uuid::Uuid;

use crate::{project::ProjectLead, *};

#[derive(Debug, Error)]
pub enum Error {
	#[error("Lead contributor does not exist")]
	NotFound,
	#[error("Lead contributor already exists")]
	AlreadyExist(#[source] anyhow::Error),
	#[error("Something happend at the infrastructure level")]
	Infrastructure(#[source] anyhow::Error),
}

#[automock]
pub trait Repository: Send + Sync {
	fn upsert(&self, lead_contributor: ProjectLead) -> Result<(), Error>;
	fn delete(&self, project_id: &ProjectId, contributor_id: Uuid) -> Result<(), Error>;
	fn list_by_project(&self, project_id: &ProjectId) -> Result<Vec<ProjectLead>, Error>;
}
