use crate::domain::Action;

use anyhow::Result;
use async_trait::async_trait;

/// Manage Contributions existence
#[async_trait]
pub trait ContributionManager {
    async fn execute_actions(
        &self,
        actions: &[Action],
        wait_for_acceptance: bool,
    ) -> Result<String>;
}
