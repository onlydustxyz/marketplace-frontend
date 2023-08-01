use async_trait::async_trait;
use domain::{
	GithubFetchIssueService, GithubFetchRepoService, GithubFetchUserService, GithubIssue,
	GithubIssueNumber, GithubIssueStatus, GithubRepoId, GithubServiceError, GithubServiceResult,
};
use infrastructure::github::{self, issue::FromOctocrab};
use octocrab::{self, models};
use olog::tracing::instrument;

use crate::domain::GithubService;

#[async_trait]
impl GithubService for github::Client {
	#[instrument(skip(self))]
	async fn create_issue(
		&self,
		repo_id: GithubRepoId,
		title: String,
		description: String,
	) -> GithubServiceResult<GithubIssue> {
		let repo = self.repo_by_id(repo_id).await?;

		let issue = self
			.octocrab()
			.issues(repo.owner, repo.name)
			.create(title)
			.body(description)
			.send()
			.await
			.map_err(github::Error::from)?;

		GithubIssue::from_octocrab(issue, repo.id).map_err(GithubServiceError::Other)
	}

	async fn close_issue(
		&self,
		repo_owner: String,
		repo_name: String,
		issue_number: GithubIssueNumber,
	) -> GithubServiceResult<()> {
		let dusty_bot = self.current_user().await?;

		let issue = self.issue(repo_owner.clone(), repo_name.clone(), issue_number).await?;
		let issue_number: u64 = issue_number.into();

		if issue.author.id == dusty_bot.id && issue.status == GithubIssueStatus::Open {
			self.octocrab()
				.issues(repo_owner, repo_name)
				.update(issue_number)
				.state(models::IssueState::Closed)
				.send()
				.await
				.map_err(github::Error::from)?;
		}
		Ok(())
	}
}
