use anyhow::Result;
use async_trait::async_trait;
use starknet::{
    accounts::{Account, Call},
    core::types::FieldElement,
    macros::selector,
};

use crate::{domain::*, starknet::contract_administrator::ContractAdministrator};

/// A on-chain smart contract address
pub type ContractAddress = FieldElement;
/// The Identifier of a gate
pub type GateId = ContractAddress;

#[async_trait]
impl<'a, A: Account + Sync> GatedContributionManager<ContributionId, GateId>
    for ContractAdministrator<'a, A>
{
    async fn add_gate_to_contribution(
        &self,
        contribution_id: ContributionId,
        gate_id: GateId,
    ) -> Result<String> {
        let calldata = vec![
            FieldElement::from_dec_str(&contribution_id)
                .expect("contribution_id wasn't a valid felt"),
            gate_id,
        ];

        let transaction_result = self
            .send_transaction(&[Call {
                to: self.contract_address(),
                selector: selector!("add_gate_to_contribution"),
                calldata,
            }])
            .await?;

        Ok(format!("0x{:x}", transaction_result.transaction_hash))
    }
}
