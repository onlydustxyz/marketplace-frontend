use crate::starknet::{Account, Client, StarknetError};
use marketplace_domain::*;

impl<A: Account + Send + Sync + 'static> OnchainContributionService for Client<A> {
	fn create(
		&self,
		contribution: Contribution,
	) -> Result<HexPrefixedString, OnchainContributionServiceError> {
		let cloned_contribution_contract = self.contributions.clone();
		let transaction_hash = tokio::runtime::Handle::current()
			.block_on(async move {
				cloned_contribution_contract
					.execute_actions(&[Action::CreateContribution {
						github_composite: contribution.onchain_id,
						project_id: contribution.project_id,
						gate: contribution.gate,
					}])
					.await
			})
			.map_err(StarknetError::from)?;

		Ok(transaction_hash)
	}

	fn assign_contributor(
		&self,
		contribution_id: ContributionId,
		contributor_id: ContributorId,
	) -> Result<HexPrefixedString, OnchainContributionServiceError> {
		let cloned_contribution_contract = self.contributions.clone();
		let transaction_hash = tokio::runtime::Handle::current()
			.block_on(async move {
				cloned_contribution_contract
					.execute_actions(&[Action::AssignContributor {
						contribution_id,
						contributor_id,
					}])
					.await
			})
			.map_err(StarknetError::from)?;

		Ok(transaction_hash)
	}

	fn unassign_contributor(
		&self,
		contribution_id: ContributionId,
	) -> Result<HexPrefixedString, OnchainContributionServiceError> {
		let cloned_contribution_contract = self.contributions.clone();
		let transaction_hash = tokio::runtime::Handle::current()
			.block_on(async move {
				cloned_contribution_contract
					.execute_actions(&[Action::UnassignContributor { contribution_id }])
					.await
			})
			.map_err(StarknetError::from)?;

		Ok(transaction_hash)
	}

	fn validate(
		&self,
		contribution_id: ContributionId,
	) -> Result<HexPrefixedString, OnchainContributionServiceError> {
		let cloned_contribution_contract = self.contributions.clone();
		let transaction_hash = tokio::runtime::Handle::current()
			.block_on(async move {
				cloned_contribution_contract
					.execute_actions(&[Action::ValidateContribution { contribution_id }])
					.await
			})
			.map_err(StarknetError::from)?;

		Ok(transaction_hash)
	}
}

impl From<StarknetError> for OnchainContributionServiceError {
	fn from(error: StarknetError) -> Self {
		Self::Infrastructure(Box::new(error))
	}
}
