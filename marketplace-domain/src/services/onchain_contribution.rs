use crate::*;
use mockall::automock;
use thiserror::Error;

#[derive(Debug, Error)]
pub enum Error {
	#[error("Something happend at the infrastructure level")]
	Infrastructure(#[source] Box<dyn std::error::Error>),
}

#[automock]
pub trait Service: Send + Sync {
	fn create(&self, contribution: Contribution) -> Result<HexPrefixedString, Error>;
	fn assign_contributor(
		&self,
		contribution_id: ContributionId,
		contributor_id: ContributorId,
	) -> Result<HexPrefixedString, Error>;
	fn unassign_contributor(
		&self,
		contribution_id: ContributionId,
	) -> Result<HexPrefixedString, Error>;
	fn validate(&self, contribution_id: ContributionId) -> Result<HexPrefixedString, Error>;
}
