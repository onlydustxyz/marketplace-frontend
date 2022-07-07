use crate::domain::{Action, Contribution};

use anyhow::Result;
use async_trait::async_trait;

/// Manage Contributions existence
#[async_trait]
pub trait ContributionManager {
    async fn add_contributions(&self, contributions: &[Contribution]) -> Result<String>;
    async fn execute_actions(
        &self,
        actions: &[Action],
        wait_for_acceptance: bool,
    ) -> Result<String>;
}
