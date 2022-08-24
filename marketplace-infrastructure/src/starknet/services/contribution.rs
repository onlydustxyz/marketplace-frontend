use crate::starknet::{Account, Client, StarknetError};
use marketplace_domain::*;

impl<A: Account + Send + Sync + 'static> OnchainContributionService for Client<A> {
	fn create(&self, contribution: Contribution) -> Result<(), OnchainContributionServiceError> {
		self.action_queue
			.write()
			.map_err(StarknetError::from)?
			.push(Action::CreateContribution {
				contribution: contribution.into(),
			});
		Ok(())
	}

	fn assign_contributor(
		&self,
		contribution_id: ContributionOnChainId,
		contributor_id: ContributorId,
	) -> Result<(), OnchainContributionServiceError> {
		self.action_queue
			.write()
			.map_err(StarknetError::from)?
			.push(Action::AssignContributor {
				contribution_id,
				contributor_id,
			});
		Ok(())
	}

	fn unassign_contributor(
		&self,
		contribution_id: ContributionOnChainId,
	) -> Result<(), OnchainContributionServiceError> {
		self.action_queue
			.write()
			.map_err(StarknetError::from)?
			.push(Action::UnassignContributor { contribution_id });
		Ok(())
	}

	fn validate(
		&self,
		contribution_id: ContributionOnChainId,
	) -> Result<(), OnchainContributionServiceError> {
		self.action_queue
			.write()
			.map_err(StarknetError::from)?
			.push(Action::ValidateContribution { contribution_id });
		Ok(())
	}
}

impl From<StarknetError> for OnchainContributionServiceError {
	fn from(error: StarknetError) -> Self {
		Self::Infrastructure(Box::new(error))
	}
}

#[cfg(test)]
mod test {
	use super::*;
	use rstest::*;
	use starknet::{
		accounts::SingleOwnerAccount, providers::SequencerGatewayProvider, signers::LocalWallet,
	};

	type StarknetClient = Client<SingleOwnerAccount<SequencerGatewayProvider, LocalWallet>>;

	#[fixture]
	fn client() -> StarknetClient {
		std::env::set_var("PRIVATE_KEY", "");
		std::env::set_var("ACCOUNT_ADDRESS", "");
		std::env::set_var("REGISTRY_ADDRESS", "");
		std::env::set_var("PROFILE_ADDRESS", "");
		std::env::set_var("JSON_RPC_URI", "htttp://localhost");

		Client::default()
	}

	#[rstest]
	fn create_contribution(client: StarknetClient) {
		let contribution = Contribution::default();

		let result = client.create(contribution.clone());

		let action = client.action_queue.write().unwrap().pop_n(1).first().unwrap().to_owned();

		assert!(result.is_ok(), "{:?}", result.err().unwrap());
		assert_eq!(
			Action::CreateContribution {
				contribution: contribution.into()
			},
			action
		)
	}

	#[rstest]
	fn assign_contributor(client: StarknetClient) {
		let contribution_id = ContributionOnChainId::from("12");
		let contributor_id: ContributorId = 34.into();

		let result = client.assign_contributor(contribution_id.clone(), contributor_id.clone());
		let action = client.action_queue.write().unwrap().pop_n(1).first().unwrap().to_owned();

		assert!(result.is_ok(), "{:?}", result.err().unwrap());
		assert_eq!(
			Action::AssignContributor {
				contribution_id,
				contributor_id
			},
			action
		)
	}

	#[rstest]
	fn unassign_contributor(client: StarknetClient) {
		let contribution_id = ContributionOnChainId::from("12");

		let result = client.unassign_contributor(contribution_id.clone());
		let action = client.action_queue.write().unwrap().pop_n(1).first().unwrap().to_owned();

		assert!(result.is_ok(), "{:?}", result.err().unwrap());
		assert_eq!(Action::UnassignContributor { contribution_id }, action)
	}

	#[rstest]
	fn validate(client: StarknetClient) {
		let contribution_id = ContributionOnChainId::from("12");

		let result = client.validate(contribution_id.clone());
		let action = client.action_queue.write().unwrap().pop_n(1).first().unwrap().to_owned();

		assert!(result.is_ok(), "{:?}", result.err().unwrap());
		assert_eq!(Action::ValidateContribution { contribution_id }, action)
	}
}
