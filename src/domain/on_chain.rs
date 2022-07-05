use super::*;
use anyhow::Result;
use async_trait::async_trait;

pub struct ContractUpdateStatus {
    pub contribution_id: ContributionId,
    pub transaction_hash: String,
}

impl ContractUpdateStatus {
    pub fn new(contribution_id: String, transaction_hash: String) -> Self {
        ContractUpdateStatus {
            contribution_id,
            transaction_hash,
        }
    }
}

/// Manage Contributions existence
#[async_trait]
pub trait ContributionManager {
    async fn add_contributions(&self, contributions: &[Contribution]) -> Result<String>;
}

/// Manage Contributions gating
#[async_trait]
pub trait GatedContributionManager<ContributionId, GateId> {
    async fn add_gate_to_contribution(
        &self,
        contribution_id: ContributionId,
        gate_id: GateId,
    ) -> Result<String>;
}
