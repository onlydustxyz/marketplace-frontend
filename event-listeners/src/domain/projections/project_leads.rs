use super::Projection;
use marketplace_domain::{Project, ProjectId};
#[cfg(test)]
use mockall::automock;
use thiserror::Error;
use uuid::Uuid;

#[derive(Debug, Clone, PartialEq, Eq, Default)]
pub struct ProjectLead {
	project_id: ProjectId,
	user_id: Uuid,
}

impl Projection for ProjectLead {
	type A = Project;
}

#[derive(Debug, Error)]
pub enum Error {
	#[error("Lead contributor does not exist")]
	NotFound,
	#[error("Lead contributor already exists")]
	AlreadyExist(#[source] anyhow::Error),
	#[error("Something happend at the infrastructure level")]
	Infrastructure(#[source] anyhow::Error),
}

#[cfg_attr(test, automock)]
pub trait Repository: Send + Sync {
	fn upsert(&self, lead_contributor: ProjectLead) -> Result<(), Error>;
	fn delete(&self, project_id: &ProjectId, contributor_id: Uuid) -> Result<(), Error>;
	fn list_by_project(&self, project_id: &ProjectId) -> Result<Vec<ProjectLead>, Error>;
}
