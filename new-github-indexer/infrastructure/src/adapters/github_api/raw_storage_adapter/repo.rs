use domain::{
	models::{issues::Issue, pulls::PullRequest, *},
	ports::output::raw_storage::*,
};

use crate::adapters::github_api::Client;

#[async_trait]
impl repo::Port for Client {
	async fn repo_by_id(&self, repo_id: RepositoryId) -> Result<Repository> {
		self.get_as(format!("/repositories/{repo_id}")).await.map_err(Into::into)
	}

	async fn repo_by_owner_name(
		&self,
		repo_owner: String,
		repo_name: String,
	) -> Result<Repository> {
		self.get_as(format!("/repos/{repo_owner}/{repo_name}"))
			.await
			.map_err(Into::into)
	}

	async fn repo_languages_by_id(&self, repo_id: RepositoryId) -> Result<Languages> {
		self.get_as(format!("/repositories/{repo_id}/languages"))
			.await
			.map_err(Into::into)
	}

	async fn repo_pull_requests_by_id(&self, repo_id: RepositoryId) -> Result<Vec<PullRequest>> {
		self.get_all_as(format!("/repositories/{repo_id}/pulls"))
			.await
			.map_err(Into::into)
	}

	async fn repo_issues_by_id(&self, repo_id: RepositoryId) -> Result<Vec<Issue>> {
		self.get_all_as(format!("/repositories/{repo_id}/pulls"))
			.await
			.map_err(Into::into)
	}
}
