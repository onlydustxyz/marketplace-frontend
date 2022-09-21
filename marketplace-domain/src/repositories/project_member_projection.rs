use mockall::automock;
use thiserror::Error;

use crate::{project::MemberProjection, *};

#[derive(Debug, Error)]
pub enum Error {
	#[error("Member does not exist")]
	NotFound,
	#[error("Member already exists")]
	AlreadyExist(#[source] anyhow::Error),
	#[error("Something happend at the infrastructure level")]
	Infrastructure(#[source] anyhow::Error),
}

#[automock]
pub trait Repository: Send + Sync {
	fn insert(&self, project_member: ProjectMemberProjection) -> Result<(), Error>;
	fn delete(
		&self,
		project_id: &ProjectId,
		contributor_account: &ContributorAccount,
	) -> Result<(), Error>;
	fn list_by_project(&self, project_id: &ProjectId) -> Result<Vec<MemberProjection>, Error>;
}
