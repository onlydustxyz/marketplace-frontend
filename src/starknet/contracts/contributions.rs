use super::ContractAdministrator;
use crate::domain::*;
use itertools::Itertools;
use starknet::{
	accounts::{Account, Call},
	core::{types::FieldElement, utils::get_selector_from_name},
};

pub struct Contract<'a, A>
where
	A: Account + Sync,
{
	administrator: ContractAdministrator<'a, A>,
}

fn contributions_contract_address() -> FieldElement {
	let contributions_contract_address =
		std::env::var("CONTRIBUTIONS_ADDRESS").expect("CONTRIBUTIONS_ADDRESS must be set");
	FieldElement::from_hex_be(&contributions_contract_address)
		.expect("Invalid value for CONTRIBUTIONS_ADDRESS")
}

impl<'a, A> Contract<'a, A>
where
	A: Account + Sync,
{
	pub fn new(administrator_account: &'a A) -> Self {
		Self {
			administrator: ContractAdministrator::new(administrator_account),
		}
	}

	pub async fn execute_actions(
		&self,
		actions: &[Action],
		wait_for_acceptance: bool,
	) -> Result<String> {
		let calls = actions.iter().map_into().collect_vec();
		let transaction_result = self
			.administrator
			.send_transaction(&calls, wait_for_acceptance)
			.await
			.map_err(|e| Error::TransactionRevertedError(e.to_string()))?;
		Ok(format!("0x{:x}", transaction_result.transaction_hash))
	}
}

impl From<&Action> for Call {
	fn from(action: &Action) -> Self {
		match action {
			Action::CreateContribution { contribution } => Self {
				to: contributions_contract_address(),
				selector: get_selector_from_name("new_contribution").unwrap(),
				calldata: vec![
					FieldElement::from_dec_str(&contribution.id).unwrap(), // id : felt
					FieldElement::from_dec_str(&contribution.project_id).unwrap(), // project_id : felt
					FieldElement::from(contribution.gate),                 /* contribution_count_required : felt */
					contribution.validator,
				],
			},

			Action::AssignContributor {
				contribution_id,
				contributor_id,
			} => {
				let (contributor_id_low, contributor_id_high) = (*contributor_id).into();

				Self {
					to: contributions_contract_address(),
					selector: get_selector_from_name("assign_contributor_to_contribution").unwrap(),
					calldata: vec![
						contribution_id.parse().unwrap(), // id : felt
						contributor_id_low,               // contributor_id : Uint256
						contributor_id_high,
					],
				}
			},

			Action::UnassignContributor { contribution_id } => Self {
				to: contributions_contract_address(),
				selector: get_selector_from_name("unassign_contributor_from_contribution").unwrap(),
				calldata: vec![
					contribution_id.parse().unwrap(), // id : felt
				],
			},

			Action::ValidateContribution { contribution_id } => Self {
				to: contributions_contract_address(),
				selector: get_selector_from_name("validate_contribution").unwrap(),
				calldata: vec![
					contribution_id.parse().unwrap(), // id : felt
				],
			},
		}
	}
}
