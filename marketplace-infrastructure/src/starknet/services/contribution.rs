use crate::starknet::{Account, Client, StarknetError};
use async_trait::async_trait;
use marketplace_domain::*;

#[async_trait]
impl<A: Account + Send + Sync + 'static> OnchainContributionService for Client<A> {
	async fn create(
		&self,
		contribution: ContributionProjection,
	) -> Result<HexPrefixedString, OnchainContributionServiceError> {
		let transaction_hash = self
			.contributions
			.execute_action(Action::CreateContribution {
				project_id: contribution.project_id,
				issue_number: contribution.issue_number,
				gate: contribution.gate,
			})
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
			.execute_action(Action::AssignContributor {
				contribution_id,
				contributor_id,
			})
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
			.execute_action(Action::UnassignContributor { contribution_id })
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
			.execute_action(Action::ValidateContribution { contribution_id })
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
