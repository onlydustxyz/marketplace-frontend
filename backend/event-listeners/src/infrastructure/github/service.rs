use async_trait::async_trait;
use domain::{GithubIssueNumber, GithubServiceError};
use infrastructure::github;

use crate::domain::GithubCommentService;

#[async_trait]
impl GithubCommentService for github::Client {
	async fn create_comment(
		&self,
		repo_owner: &str,
		repo_name: &str,
		issue_number: &GithubIssueNumber,
		comment: &str,
	) -> Result<(), GithubServiceError> {
		let handler = self.octocrab().issues(repo_owner, repo_name);
		let issue_number: i64 = (*issue_number).into();
		handler
			.create_comment(issue_number as u64, comment)
			.await
			.map_err(Into::<github::Error>::into)?;
		Ok(())
	}
}
