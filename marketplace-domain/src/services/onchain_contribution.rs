use crate::*;
use async_trait::async_trait;
use mockall::automock;
use thiserror::Error;

#[derive(Debug, Error)]
pub enum Error {
	#[error(transparent)]
	Infrastructure(anyhow::Error),
}

#[async_trait]
#[automock]
pub trait Service: Send + Sync {
	async fn create(&self, contribution: GithubContribution) -> Result<HexPrefixedString, Error>;
	async fn assign_contributor(
		&self,
		contribution_id: ContributionId,
		contributor_account_address: AccountAddress,
	) -> Result<HexPrefixedString, Error>;
	async fn unassign_contributor(
		&self,
		contribution_id: ContributionId,
	) -> Result<HexPrefixedString, Error>;
	async fn validate(&self, contribution_id: ContributionId) -> Result<HexPrefixedString, Error>;
}
