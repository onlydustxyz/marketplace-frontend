use crate::domain::{GithubRepository, GithubUser};
use anyhow::Result;

#[async_trait]
pub trait Service: Send + Sync {
	async fn fetch_repository_by_id(&self, id: u64) -> Result<GithubRepository>;
	async fn fetch_user_by_name(&self, username: &str) -> Result<GithubUser>;
}
