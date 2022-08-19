use crate::domain::{Action, Contributor, ContributorId};

use anyhow::Result;
use async_trait::async_trait;
use starknet::core::types::FieldElement;

/// Manage Contributions existence
#[async_trait]
pub trait ContributionManager {
	async fn execute_actions(
		&self,
		actions: &[Action],
		wait_for_acceptance: bool,
	) -> Result<String>;
}

/// Manage User registration informations
#[async_trait]
pub trait ContributorRegistryViewer {
	async fn get_user_information(&self, account: FieldElement) -> Option<Contributor>;
	async fn get_user_information_from_github_identifier(
		&self,
		github_userid: &str,
	) -> Option<Contributor>;
}

/// Profile contract
#[async_trait]
pub trait ContributorProfileViewer {
	async fn get_account(&self, contributor_id: &ContributorId) -> Option<FieldElement>;
}
