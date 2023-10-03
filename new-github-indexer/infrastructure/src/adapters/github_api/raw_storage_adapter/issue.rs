use domain::{
	models::{issues::Issue, *},
	ports::output::raw_storage::*,
};

use crate::adapters::github_api::Client;

#[async_trait]
impl issue::Port for Client {
	async fn issue_by_repo_id(&self, repo_id: RepositoryId, issue_number: u64) -> Result<Issue> {
		self.get_as(format!("/repositories/{repo_id}/issues/{issue_number}"))
			.await
			.map_err(Into::into)
	}

	async fn issue_by_repo_owner_name(
		&self,
		repo_owner: String,
		repo_name: String,
		issue_number: u64,
	) -> Result<Issue> {
		self.get_as(format!(
			"/repos/{repo_owner}/{repo_name}/issues/{issue_number}"
		))
		.await
		.map_err(Into::into)
	}
}
