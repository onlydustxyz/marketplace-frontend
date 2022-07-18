use anyhow::Result;
use async_trait::async_trait;
use starknet::{
    accounts::{Account, Call},
    core::{types::FieldElement, utils::get_selector_from_name},
};

use crate::{
    domain::*,
    starknet::{contract_administrator::ContractAdministrator, contributions_contract_address},
};

#[async_trait]
impl<'a, A: Account + Sync> ContributionManager for ContractAdministrator<'a, A> {
    async fn execute_actions(
        &self,
        actions: &[Action],
        wait_for_acceptance: bool,
    ) -> Result<String> {
        let calls = actions.iter().map(Call::from).collect::<Vec<_>>();
        let transaction_result = self.send_transaction(&calls, wait_for_acceptance).await?;
        Ok(format!("0x{:x}", transaction_result.transaction_hash))
    }
}

impl From<&Action> for Call {
    fn from(action: &Action) -> Self {
        match action {
            Action::CreateContribution {
                contribution_id,
                project_id,
                gate,
            } => Self {
                to: contributions_contract_address(),
                selector: get_selector_from_name("new_contribution").unwrap(),
                calldata: vec![
                    FieldElement::from_dec_str(contribution_id).unwrap(), // id : felt
                    FieldElement::from_dec_str(project_id).unwrap(),      // project_id : felt
                    FieldElement::from(*gate), // contribution_count_required : felt
                ],
            },

            Action::AssignContributor {
                contribution_id,
                contributor_id,
            } => {
                let (contributor_id_low, contributor_id_high) = contributor_id.into();

                Self {
                    to: contributions_contract_address(),
                    selector: get_selector_from_name("assign_contributor_to_contribution").unwrap(),
                    calldata: vec![
                        contribution_id.parse().unwrap(), // id : felt
                        contributor_id_low,               // contributor_id : Uint256
                        contributor_id_high,
                    ],
                }
            }

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
