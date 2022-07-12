use crate::domain::{Action, ContributionId, Contributor, ContributorId};

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

/// Manage Contributions existence
#[async_trait]
pub trait ContributionViewer {
    async fn get_eligible_contributions(
        &self,
        contributor_id: &ContributorId,
    ) -> Result<Vec<ContributionId>>;
}

/// Manage User registration informations
#[async_trait]
pub trait ContributorRegistryViewer {
    async fn get_user_information(&self, user: &str) -> Option<Contributor>;
}
