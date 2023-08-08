use anyhow::{Context, Result};
use async_trait::async_trait;
use octocrab::{self, models};

use domain::{
	GithubFetchIssueService, GithubFetchUserService, GithubIssue, GithubIssueNumber,
	GithubIssueStatus, GithubRepoId,
};
use infrastructure::github::{self, issue::FromOctocrab};
use olog::tracing::instrument;

use crate::domain::DustyBotService;

#[async_trait]
impl DustyBotService for github::Client {
	#[instrument(skip(self))]
	async fn create_issue(
		&self,
		repo_id: GithubRepoId,
		repo_owner: String,
		repo_name: String,
		title: String,
		description: String,
	) -> Result<GithubIssue> {
		let issue = self
			.octocrab()
			.issues(repo_owner.clone(), repo_name.clone())
			.create(title.clone())
			.body(description.clone())
			.send()
			.await
			.context(format!("creating issue for repo {repo_id}"))?;

		GithubIssue::from_octocrab(issue, repo_id)
	}

	async fn close_issue(
		&self,
		repo_owner: String,
		repo_name: String,
		issue: GithubIssue,
	) -> Result<()> {
		let dusty_bot = self.current_user().await?;
		let issue_number: u64 = issue.number.into();

		if issue.author.id == dusty_bot.id && issue.status == GithubIssueStatus::Open {
			self.octocrab()
				.issues(repo_owner, repo_name)
				.update(issue_number)
				.state(models::IssueState::Closed)
				.send()
				.await
				.map_err(|e|{
					println!("{:?}",e);
					e
				})
				.map_err(github::Error::from)?;
		}
		Ok(())
	}

	async fn close_issue_for_number(
		&self,
		repo_owner: String,
		repo_name: String,
		issue_number: GithubIssueNumber,
	) -> Result<()> {
		let issue_number: u64 = issue_number.into();
		let issue = self.issue(repo_owner.clone(), repo_name.clone(), issue_number.into()).await?;

		let dusty_bot = self.current_user().await?;
		if issue.author.id == dusty_bot.id && issue.status == GithubIssueStatus::Open {
			self.octocrab()
				.issues(repo_owner, repo_name)
				.update(issue.number.into())
				.state(models::IssueState::Closed)
				.send()
				.await
				.map_err(github::Error::from)?;
		}
		Ok(())
	}
}
