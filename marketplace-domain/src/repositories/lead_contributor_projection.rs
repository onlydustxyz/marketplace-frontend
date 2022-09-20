use mockall::automock;
use thiserror::Error;

use crate::{project::LeadContributorProjection, *};

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
	fn store(&self, lead_contributor: LeadContributorProjection) -> Result<(), Error>;
	fn delete(&self, project_id: &ProjectId, account: &Account) -> Result<(), Error>;
	fn list_by_project(
		&self,
		project_id: &ProjectId,
	) -> Result<Vec<LeadContributorProjection>, Error>;
}
