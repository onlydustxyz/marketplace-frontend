use crate::{
	domain::*,
	infrastructure::starknet::{Account, Client},
};

impl<A: Account + Send + Sync> ContributionService for Client<A> {
	fn create(&self, contribution: Contribution) -> AnyResult<()> {
		self.action_queue_mut()?.push(Action::CreateContribution {
			contribution: contribution.into(),
		});
		Ok(())
	}

	fn assign_contributor(
		&self,
		contribution_id: ContributionId,
		contributor_id: ContributorId,
	) -> AnyResult<()> {
		self.action_queue_mut()?.push(Action::AssignContributor {
			contribution_id: contribution_id.to_string(),
			contributor_id,
		});
		Ok(())
	}

	fn unassign_contributor(&self, contribution_id: ContributionId) -> AnyResult<()> {
		self.action_queue_mut()?.push(Action::UnassignContributor {
			contribution_id: contribution_id.to_string(),
		});
		Ok(())
	}

	fn validate(&self, contribution_id: ContributionId) -> AnyResult<()> {
		self.action_queue_mut()?.push(Action::ValidateContribution {
			contribution_id: contribution_id.to_string(),
		});
		Ok(())
	}
}

#[cfg(test)]
mod test {
	use super::*;
	use dotenv::dotenv;
	use rstest::*;
	use starknet::{
		accounts::SingleOwnerAccount, core::types::FieldElement,
		providers::SequencerGatewayProvider, signers::LocalWallet,
	};
	use uuid::Uuid;

	type StarknetClient = Client<SingleOwnerAccount<SequencerGatewayProvider, LocalWallet>>;

	#[fixture]
	fn client() -> StarknetClient {
		dotenv().ok();
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
		let contribution_id = Uuid::from_u128(12);
		let contributor_id: ContributorId = 34.into();

		let result = client.assign_contributor(contribution_id, contributor_id);
		let action = client.action_queue_mut().unwrap().pop_n(1).first().unwrap().to_owned();

		assert!(result.is_ok(), "{:?}", result.err().unwrap());
		assert_eq!(
			Action::AssignContributor {
				contribution_id: contribution_id.to_string(),
				contributor_id
			},
			action
		)
	}

	#[rstest]
	fn unassign_contributor(client: StarknetClient) {
		let contribution_id = Uuid::from_u128(12);

		let result = client.unassign_contributor(contribution_id);
		let action = client.action_queue_mut().unwrap().pop_n(1).first().unwrap().to_owned();

		assert!(result.is_ok(), "{:?}", result.err().unwrap());
		assert_eq!(
			Action::UnassignContributor {
				contribution_id: contribution_id.to_string(),
			},
			action
		)
	}

	#[rstest]
	fn validate(client: StarknetClient) {
		let contribution_id = Uuid::from_u128(12);

		let result = client.validate(contribution_id);
		let action = client.action_queue_mut().unwrap().pop_n(1).first().unwrap().to_owned();

		assert!(result.is_ok(), "{:?}", result.err().unwrap());
		assert_eq!(
			Action::ValidateContribution {
				contribution_id: contribution_id.to_string(),
			},
			action
		)
	}
}
