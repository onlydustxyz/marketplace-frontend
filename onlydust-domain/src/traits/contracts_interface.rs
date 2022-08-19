use crate::Contributor;

use async_trait::async_trait;
use starknet::core::types::FieldElement;

/// Manage User registration informations
#[async_trait]
pub trait ContributorRegistryViewer {
	async fn get_user_information(&self, account: FieldElement) -> Option<Contributor>;
	async fn get_user_information_from_github_identifier(
		&self,
		github_userid: &str,
	) -> Option<Contributor>;
}
