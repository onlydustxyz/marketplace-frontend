use crate::domain::*;
use mockall::automock;
use thiserror::Error;

#[derive(Debug, Error)]
pub enum Error {
	#[error("Something happend at the infrastructure level")]
	Infrastructure(#[source] Box<dyn std::error::Error>),
}

#[automock]
pub trait Service: Send + Sync {
	fn create(&self, contribution: Contribution) -> Result<(), Error>;
	fn assign_contributor(
		&self,
		contribution_id: ContributionOnChainId,
		contributor_id: ContributorId,
	) -> Result<(), Error>;
	fn unassign_contributor(&self, contribution_id: ContributionOnChainId) -> Result<(), Error>;
	fn validate(&self, contribution_id: ContributionOnChainId) -> Result<(), Error>;
}
