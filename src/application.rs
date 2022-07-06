use anyhow::Result;

use crate::domain::{Contribution, ContributionId, ContributorId};

pub fn create_contribution(_contribution: Contribution) -> Result<()> {
    Ok(())
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
