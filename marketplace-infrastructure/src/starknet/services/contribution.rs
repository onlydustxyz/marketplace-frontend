use crate::starknet::{Account, Client, StarknetError};
use async_trait::async_trait;
use marketplace_domain::*;

#[async_trait]
impl<A: Account + Send + Sync + 'static> OnchainContributionService for Client<A> {
	async fn create(
		&self,
		contribution: Contribution,
	) -> Result<HexPrefixedString, OnchainContributionServiceError> {
		let transaction_hash = self
			.contributions
			.execute_actions(&[Action::CreateContribution {
				github_composite: contribution.old_composite_id(),
				project_id: contribution.project_id,
				gate: contribution.gate,
			}])
			.await
			.map_err(StarknetError::from)?;

		Ok(transaction_hash)
	}

	async fn assign_contributor(
		&self,
		contribution_id: ContributionId,
		contributor_id: ContributorId,
	) -> Result<HexPrefixedString, OnchainContributionServiceError> {
		let transaction_hash = self
			.contributions
			.execute_actions(&[Action::AssignContributor {
				contribution_id,
				contributor_id,
			}])
			.await
			.map_err(StarknetError::from)?;

		Ok(transaction_hash)
	}

	async fn unassign_contributor(
		&self,
		contribution_id: ContributionId,
	) -> Result<HexPrefixedString, OnchainContributionServiceError> {
		let transaction_hash = self
			.contributions
			.execute_actions(&[Action::UnassignContributor { contribution_id }])
			.await
			.map_err(StarknetError::from)?;

		Ok(transaction_hash)
	}

	async fn validate(
		&self,
		contribution_id: ContributionId,
	) -> Result<HexPrefixedString, OnchainContributionServiceError> {
		let transaction_hash = self
			.contributions
			.execute_actions(&[Action::ValidateContribution { contribution_id }])
			.await
			.map_err(StarknetError::from)?;

		Ok(transaction_hash)
	}
}

impl From<StarknetError> for OnchainContributionServiceError {
	fn from(error: StarknetError) -> Self {
		Self::Infrastructure(Box::new(error))
	}
}
