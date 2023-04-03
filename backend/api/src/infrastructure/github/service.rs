use anyhow::anyhow;
use async_trait::async_trait;
use domain::{GithubIssue, GithubServiceError, GithubServiceResult};
use infrastructure::github::{self, IssueFromOctocrab};
use olog::tracing::instrument;

#[async_trait]
impl crate::domain::GithubService for github::Client {
	#[instrument(skip(self))]
	async fn create_issue(
		&self,
		repo_owner: &str,
		repo_name: &str,
		title: &str,
		description: &str,
	) -> GithubServiceResult<GithubIssue> {
		let issue = self
			.octocrab()
			.issues(repo_owner, repo_name)
			.create(title)
			.body(description)
			.send()
			.await
			.map_err(|e| GithubServiceError::Other(anyhow!(e)))?;

		let repo_id = self.get_issue_repository_id(&issue).await?;

		GithubIssue::from_octocrab_issue(issue, repo_id).map_err(GithubServiceError::Other)
	}
}
