use async_trait::async_trait;
use domain::{
	GithubFetchRepoService, GithubIssue, GithubIssueNumber, GithubRepositoryId, GithubServiceError,
	GithubServiceResult,
};
use infrastructure::github::{self, IssueFromOctocrab};
use octocrab::{self, models};
use olog::tracing::instrument;

use crate::domain::GithubService;

#[async_trait]
impl GithubService for github::Client {
	#[instrument(skip(self))]
	async fn create_issue(
		&self,
		repo_id: &GithubRepositoryId,
		title: &str,
		description: &str,
	) -> GithubServiceResult<GithubIssue> {
		let repo = self.repo_by_id(repo_id).await?;

		let issue = self
			.octocrab()
			.issues(repo.owner(), repo.name())
			.create(title)
			.body(description)
			.send()
			.await
			.map_err(github::Error::from)?;

		GithubIssue::from_octocrab_issue(issue, *repo.id()).map_err(GithubServiceError::Other)
	}

	async fn create_comment(
		&self,
		repo_owner: &str,
		repo_name: &str,
		issue_number: &GithubIssueNumber,
		comment: &str,
	) -> GithubServiceResult<()> {
		let issue_number = (*issue_number).into();

		self.octocrab()
			.issues(repo_owner, repo_name)
			.create_comment(issue_number, comment)
			.await
			.map_err(github::Error::from)?;

		Ok(())
	}

	async fn get_latest_own_comment_on_issue(
		&self,
		repo_owner: &str,
		repo_name: &str,
		issue_number: &GithubIssueNumber,
	) -> GithubServiceResult<Option<String>> {
		let dusty_bot = self.get_current_user().await.map_err(github::Error::from)?;

		let mut comments: Vec<_> = self
			.all_issue_comments(repo_owner, repo_name, issue_number)
			.await
			.map_err(github::Error::from)?
			.into_iter()
			.filter(|comment| comment.user.id == dusty_bot.id)
			.collect();

		comments.sort_by_key(|comment| comment.created_at);

		Ok(comments.last().cloned().and_then(|comment| comment.body))
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
			.map_err(github::Error::from)?;

		Ok(())
	}
}
