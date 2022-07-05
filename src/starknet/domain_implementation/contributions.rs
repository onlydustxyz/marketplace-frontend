use anyhow::Result;
use async_trait::async_trait;
use starknet::{
    accounts::{Account, Call},
    core::{
        types::FieldElement,
        utils::{cairo_short_string_to_felt, get_selector_from_name},
    },
};

use crate::{domain::*, starknet::contract_administrator::ContractAdministrator};

#[async_trait]
impl<'a, A: Account + Sync> ContributionManager for ContractAdministrator<'a, A> {
    async fn add_contributions(&self, contributions: &[Contribution]) -> Result<String> {
        let calls = contributions
            .iter()
            .map(|contribution| self.make_add_contribution_call(contribution))
            .collect::<Vec<_>>();

        let transaction_result = self.send_transaction(&calls).await?;

        Ok(format!("0x{:x}", transaction_result.transaction_hash))
    }
}

impl<'a, A: Account + Sync> ContractAdministrator<'a, A> {
    fn make_add_contribution_call(&self, contribution: &Contribution) -> Call {
        Call {
            to: self.contract_address(),
            selector: get_selector_from_name("add_contribution_from_handle").unwrap(),
            calldata: vec![
                FieldElement::from_dec_str(&contribution.author).unwrap(), // github identifier
                cairo_short_string_to_felt("").unwrap(),                   // owner
                cairo_short_string_to_felt(&contribution.project_id).unwrap(), // repo
                FieldElement::from_dec_str(&contribution.id).unwrap(),     // PR ID
                FieldElement::from_dec_str(&contribution.status.to_string()).unwrap(), // PR status (merged)
            ],
        }
    }
}
