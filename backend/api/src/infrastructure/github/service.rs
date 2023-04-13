use anyhow::anyhow;
use async_trait::async_trait;
use domain::{GithubIssue, GithubIssueNumber, GithubServiceError, GithubServiceResult};
use infrastructure::github::{self, IssueFromOctocrab};
use octocrab::{self, models};
use olog::tracing::instrument;

use crate::domain::GithubService;

#[async_trait]
impl GithubService for github::Client {
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

		GithubIssue::from_octocrab_issue(issue, repo_id)
			.map_err(|e| GithubServiceError::Other(anyhow!(e)))
	}

	async fn create_comment(
		&self,
		repo_owner: &str,
		repo_name: &str,
		issue_number: &GithubIssueNumber,
		comment: &str,
	) -> GithubServiceResult<()> {
		let issue_number: i64 = (*issue_number).into();

		self.octocrab()
			.issues(repo_owner, repo_name)
			.create_comment(issue_number as u64, comment)
			.await
			.map_err(Into::<github::Error>::into)?;

		Ok(())
	}

	async fn get_latest_own_comment_on_issue(
		&self,
		repo_owner: &str,
		repo_name: &str,
		issue_number: &GithubIssueNumber,
	) -> GithubServiceResult<Option<String>> {
		let issue_number: i64 = (*issue_number).into();

		let own_id =
			self.octocrab().current().user().await.map_err(Into::<github::Error>::into)?.id;

		let comment = self
			.octocrab()
			.issues(repo_owner, repo_name)
			.list_comments(issue_number as u64)
			.send()
			.await
			.map_err(Into::<github::Error>::into)?
			.items
			.into_iter()
			.find(|comment| comment.user.id == own_id)
			.and_then(|comment| comment.body);

		Ok(comment)
	}

	async fn close_issue(
		&self,
		repo_owner: &str,
		repo_name: &str,
		issue_number: &GithubIssueNumber,
	) -> GithubServiceResult<()> {
		let issue_number: i64 = (*issue_number).into();

		self.octocrab()
			.issues(repo_owner, repo_name)
			.update(issue_number as u64)
			.state(models::IssueState::Closed)
			.send()
			.await
			.map_err(Into::<github::Error>::into)?;

		Ok(())
	}
}
