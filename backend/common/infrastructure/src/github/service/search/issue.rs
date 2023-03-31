use async_trait::async_trait;
use domain::{GithubIssue, GithubSearchIssueService, GithubServiceResult};
use futures::future::join_all;
use olog::{error, tracing::instrument};

use crate::{github, github::IssueFromOctocrab};

#[async_trait]
impl GithubSearchIssueService for github::Client {
	#[instrument(skip(self))]
	async fn issues(
		&self,
		query: &str,
		sort: Option<String>,
		order: Option<String>,
		per_page: Option<u8>,
		page: Option<u32>,
	) -> GithubServiceResult<Vec<GithubIssue>> {
		let issues = self.search_issues(query, sort, order, per_page, page).await?.into_iter().map(
			|issue| async {
				let repo_id = self.get_issue_repository_id(&issue).await?;
				GithubIssue::from_octocrab_issue(issue, repo_id)
			},
		);

		let issues = join_all(issues)
			.await
			.into_iter()
			.filter_map(|result| match result {
				Ok(issue) => Some(issue),
				Err(error) => {
					error!(error = error.to_string(), "Failed to map Octocrab issue");
					None
				},
			})
			.collect();

		Ok(issues)
	}
}
