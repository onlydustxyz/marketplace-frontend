use crate::{
	domain::*,
	infrastructure::starknet::{Account, Client},
};

impl<'a, A: Account + Sync> ContributionService for Client<'a, A> {
	fn create(&self, contribution: Contribution) -> Result<()> {
		self.action_queue_mut()?.push(Action::CreateContribution { contribution });
		Ok(())
	}

	fn assign_contributor(
		&self,
		contribution_id: ContributionId,
		contributor_id: ContributorId,
	) -> Result<()> {
		self.action_queue_mut()?.push(Action::AssignContributor {
			contribution_id: contribution_id.to_string(),
			contributor_id,
		});
		Ok(())
	}

	fn unassign_contributor(&self, contribution_id: ContributionId) -> Result<()> {
		self.action_queue_mut()?.push(Action::UnassignContributor {
			contribution_id: contribution_id.to_string(),
		});
		Ok(())
	}

	fn validate(&self, contribution_id: ContributionId) -> Result<()> {
		self.action_queue_mut()?.push(Action::ValidateContribution {
			contribution_id: contribution_id.to_string(),
		});
		Ok(())
	}
}

#[cfg(test)]
mod test {
	use super::*;
	use crate::infrastructure::starknet::make_account;
	use dotenv::dotenv;
	use starknet::core::types::FieldElement;
	use uuid::Uuid;

	#[test]
	fn create_contribution() {
		dotenv().ok();

		let account = make_account("", "");
		let starknet = Client::new(&account);

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

		let result = starknet.create(contribution.clone());

		let action = starknet.action_queue_mut().unwrap().pop_n(1).first().unwrap().to_owned();

		assert!(result.is_ok(), "{:?}", result.err().unwrap());
		assert_eq!(Action::CreateContribution { contribution }, action)
	}

	#[test]
	fn assign_contributor() {
		dotenv().ok();

		let account = make_account("", "");
		let starknet = Client::new(&account);

		let contribution_id = Uuid::from_u128(12);
		let contributor_id: ContributorId = 34.into();

		let result = starknet.assign_contributor(contribution_id.clone(), contributor_id.clone());
		let action = starknet.action_queue_mut().unwrap().pop_n(1).first().unwrap().to_owned();

		assert!(result.is_ok(), "{:?}", result.err().unwrap());
		assert_eq!(
			Action::AssignContributor {
				contribution_id: contribution_id.to_string(),
				contributor_id
			},
			action
		)
	}

	#[test]
	fn unassign_contributor() {
		dotenv().ok();

		let account = make_account("", "");
		let starknet = Client::new(&account);

		let contribution_id = Uuid::from_u128(12);

		let result = starknet.unassign_contributor(contribution_id.clone());
		let action = starknet.action_queue_mut().unwrap().pop_n(1).first().unwrap().to_owned();

		assert!(result.is_ok(), "{:?}", result.err().unwrap());
		assert_eq!(
			Action::UnassignContributor {
				contribution_id: contribution_id.to_string(),
			},
			action
		)
	}

	#[test]
	fn validate() {
		dotenv().ok();

		let account = make_account("", "");
		let starknet = Client::new(&account);

		let contribution_id = Uuid::from_u128(12);

		let result = starknet.validate(contribution_id.clone());
		let action = starknet.action_queue_mut().unwrap().pop_n(1).first().unwrap().to_owned();

		assert!(result.is_ok(), "{:?}", result.err().unwrap());
		assert_eq!(
			Action::ValidateContribution {
				contribution_id: contribution_id.to_string(),
			},
			action
		)
	}
}
