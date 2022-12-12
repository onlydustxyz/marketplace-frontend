use crate::domain::GithubRepository;
use anyhow::Result;

#[async_trait]
pub trait Service: Send + Sync {
	async fn fetch_repository_by_id(&self, id: u64) -> Result<GithubRepository>;
}
