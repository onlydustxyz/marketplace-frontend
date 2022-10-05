use mockall::automock;

use crate::*;
use thiserror::Error;

#[derive(Debug, Error)]
pub enum Error {
	#[error("Contribution not found")]
	NotFound,
	#[error("Contribution already exist")]
	AlreadyExist(#[source] Box<dyn std::error::Error>),
	#[error("Contribution contains invalid members")]
	InvalidEntity(#[source] Box<dyn std::error::Error>),
	#[error("Something happend at the infrastructure level")]
	Infrastructure(#[source] Box<dyn std::error::Error>),
}

pub enum Filter {
	Project(ProjectId),
	Contributor(ContributorId),
}

impl From<ProjectId> for Filter {
	fn from(id: ProjectId) -> Self {
		Self::Project(id)
	}
}

impl From<ContributorId> for Filter {
	fn from(id: ContributorId) -> Self {
		Self::Contributor(id)
	}
}

#[automock]
pub trait Repository: Send + Sync {
	fn find(&self, filters: &[Filter]) -> Result<Vec<ContributionProjection>, Error>;

	fn find_by_id(
		&self,
		contribution_id: &ContributionId,
	) -> Result<Option<ContributionProjection>, Error>;

	fn insert(&self, contribution: ContributionProjection) -> Result<(), Error>;

	fn update_contributor_and_status(
		&self,
		contribution_id: ContributionId,
		contributor_account_address: Option<ContributorAccountAddress>,
		status: ContributionStatus,
	) -> Result<(), Error>;

	fn update_status(
		&self,
		contribution_id: &ContributionId,
		status: ContributionStatus,
	) -> Result<(), Error>;

	fn update_gate(&self, contribution_id: ContributionId, gate: u8) -> Result<(), Error>;

	fn list_by_project(
		&self,
		project_id: &GithubProjectId,
	) -> Result<Vec<ContributionProjection>, Error>;
}
