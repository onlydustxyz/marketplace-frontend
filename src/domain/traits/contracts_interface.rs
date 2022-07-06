use crate::domain::Contribution;

use anyhow::Result;
use async_trait::async_trait;

/// Manage Contributions existence
#[async_trait]
pub trait ContributionManager {
    async fn add_contributions(&self, contributions: &[Contribution]) -> Result<String>;
}
