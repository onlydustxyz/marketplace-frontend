use domain::{models::*, ports::output::github_api::*};

use crate::adapters::github_api::Client;

#[async_trait]
impl repo::Port for Client {
	async fn repo_by_id(&self, repo_id: u64) -> Result<Repository> {
		let repo: octocrab_indexer::models::Repository =
			self.get_as(format!("/repositories/{repo_id}")).await?;
		let languages: Languages =
			self.get_as(format!("/repositories/{repo_id}/languages")).await?;
		Ok(Repository { repo, languages })
	}
}
