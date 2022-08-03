use crate::{
	domain::*,
	infrastructure::starknet::{Account, Client, StarknetError},
};

impl<A: Account + Send + Sync + 'static> ContributionService for Client<A> {
	fn create(&self, contribution: Contribution) -> Result<(), ContributionServiceError> {
		self.action_queue_mut().map_err(ContributionServiceError::from)?.push(
			Action::CreateContribution {
				contribution: contribution.into(),
			},
		);
		Ok(())
	}

	fn assign_contributor(
		&self,
		contribution_id: ContributionOnChainId,
		contributor_id: ContributorId,
	) -> Result<(), ContributionServiceError> {
		self.action_queue_mut().map_err(ContributionServiceError::from)?.push(
			Action::AssignContributor {
				contribution_id,
				contributor_id,
			},
		);
		Ok(())
	}

	fn unassign_contributor(
		&self,
		contribution_id: ContributionOnChainId,
	) -> Result<(), ContributionServiceError> {
		self.action_queue_mut()
			.map_err(ContributionServiceError::from)?
			.push(Action::UnassignContributor { contribution_id });
		Ok(())
	}

	fn validate(
		&self,
		contribution_id: ContributionOnChainId,
	) -> Result<(), ContributionServiceError> {
		self.action_queue_mut()
			.map_err(ContributionServiceError::from)?
			.push(Action::ValidateContribution { contribution_id });
		Ok(())
	}
}

impl From<StarknetError> for ContributionServiceError {
	fn from(error: StarknetError) -> Self {
		Self::Infrastructure(Box::new(error))
	}
}

#[cfg(test)]
mod test {
	use super::*;
	use rstest::*;
	use starknet::{
		accounts::SingleOwnerAccount, core::types::FieldElement,
		providers::SequencerGatewayProvider, signers::LocalWallet,
	};
	use uuid::Uuid;

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
		let contribution = Contribution {
			id: Uuid::from_u128(12),
			onchain_id: String::from("12"),
			project_id: String::from("34"),
			contributor_id: None,
			title: None,
			description: None,
			status: ContributionStatus::Open,
			external_link: None,
			gate: 0,
			metadata: ContributionMetadata {
				difficulty: None,
				technology: None,
				duration: None,
				context: None,
				r#type: None,
			},
			validator: FieldElement::ZERO,
		};

		let result = client.create(contribution.clone());

		let action = client.action_queue_mut().unwrap().pop_n(1).first().unwrap().to_owned();

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

		let result = client.assign_contributor(contribution_id.clone(), contributor_id);
		let action = client.action_queue_mut().unwrap().pop_n(1).first().unwrap().to_owned();

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
		let action = client.action_queue_mut().unwrap().pop_n(1).first().unwrap().to_owned();

		assert!(result.is_ok(), "{:?}", result.err().unwrap());
		assert_eq!(Action::UnassignContributor { contribution_id }, action)
	}

	#[rstest]
	fn validate(client: StarknetClient) {
		let contribution_id = ContributionOnChainId::from("12");

		let result = client.validate(contribution_id.clone());
		let action = client.action_queue_mut().unwrap().pop_n(1).first().unwrap().to_owned();

		assert!(result.is_ok(), "{:?}", result.err().unwrap());
		assert_eq!(Action::ValidateContribution { contribution_id }, action)
	}
}
