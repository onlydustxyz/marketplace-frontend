use crate::{
	ContributionId, ContributionStatus, ContributorAccountAddress, GithubContribution,
	GithubProjectId,
};
use mockall::automock;
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

#[automock]
pub trait Repository: Send + Sync {
	fn list_all(&self) -> Result<Vec<GithubContribution>, Error>;

	fn find_by_id(
		&self,
		contribution_id: &ContributionId,
	) -> Result<Option<GithubContribution>, Error>;

	fn insert(&self, contribution: GithubContribution) -> Result<(), Error>;

	fn update_contributor_and_status<'a>(
		&self,
		contribution_id: &ContributionId,
		contributor_account_address: Option<&'a ContributorAccountAddress>,
		status: ContributionStatus,
	) -> Result<(), Error>;

	fn update_status(
		&self,
		contribution_id: &ContributionId,
		status: ContributionStatus,
	) -> Result<(), Error>;

	fn update_closed(&self, contribution_id: &ContributionId, closed: bool) -> Result<(), Error>;

	fn update_gate(&self, contribution_id: ContributionId, gate: u8) -> Result<(), Error>;

	fn list_by_project(
		&self,
		project_id: &GithubProjectId,
	) -> Result<Vec<GithubContribution>, Error>;
}
