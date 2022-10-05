use mockall::automock;

use crate::{
	ContributionId, ContributionProjection, ContributionStatus, ContributorId, GithubProjectId,
};

use super::*;

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
