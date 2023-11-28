use anyhow::Result;
use domain::*;
use infrastructure::http;
use serde_json::json;

use crate::domain::services::new_indexer;

#[async_trait]
impl new_indexer::Service for http::Client {
	async fn index_repo(&self, repo_id: GithubRepoId) -> Result<()> {
		self.post(
			"api/v1/events/on-repo-link-changed".to_string(),
			Some(json!({
				"linkedRepoIds": [repo_id]
			})),
		)
		.await?;
		Ok(())
	}
}
