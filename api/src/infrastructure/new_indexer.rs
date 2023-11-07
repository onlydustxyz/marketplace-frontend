use anyhow::Result;
use domain::*;
use infrastructure::http;

use crate::domain::services::new_indexer;

#[async_trait]
impl new_indexer::Service for http::Client {
	async fn index_repo(&self, repo_id: GithubRepoId) -> Result<()> {
		self.put(format!("api/v1/indexes/repos/{repo_id}")).await?;
		Ok(())
	}
}
