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

#[async_trait]
pub trait Oracle {
    async fn add_contributions<'life1>(
        &self,
        contributions: &'life1 [Contribution],
    ) -> Result<String>;
}
