use anyhow::Result;

use crate::domain::{Contribution, ContributionId, ContributionManager, ContributorId};
use crate::starknet::{
    contribution_registry_address, make_account_from_env, ContractAdministrator,
};

/// Try to create contributions on chain
///
/// Return the transaction hash
pub async fn create_contributions(contributions: Vec<Contribution>) -> Result<String> {
    let account = make_account_from_env();
    let address = contribution_registry_address();

    let contribution_registry_administrator = ContractAdministrator::new(address, &account);
    let transaction_hash = contribution_registry_administrator
        .add_contributions(&contributions)
        .await?;

    Ok(transaction_hash)
}

pub fn assign_contribution(
    _contribution: ContributionId,
    _contributor: ContributorId,
) -> Result<()> {
    Ok(())
}

pub fn unassign_contribution(_contribution: ContributionId) -> Result<()> {
    Ok(())
}

pub fn validate_contribution(_contribution: ContributionId) -> Result<()> {
    Ok(())
}
