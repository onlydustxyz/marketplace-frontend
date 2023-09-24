use async_trait::async_trait;
use domain::{GithubIssueNumber, GithubServiceResult};
use infrastructure::github;

use crate::domain::GithubService;

#[async_trait]
impl GithubService for github::Client {
	async fn get_latest_own_comment_on_issue(
		&self,
		repo_owner: &str,
		repo_name: &str,
		issue_number: &GithubIssueNumber,
	) -> GithubServiceResult<Option<String>> {
		let dusty_bot = self.get_current_user().await?;

		let mut comments: Vec<_> = self
			.all_issue_comments(repo_owner, repo_name, issue_number)
			.await?
			.into_iter()
			.filter(|comment| comment.user.id == dusty_bot.id)
			.collect();

		comments.sort_by_key(|comment| comment.created_at);

		Ok(comments.last().cloned().and_then(|comment| comment.body))
	}
}
