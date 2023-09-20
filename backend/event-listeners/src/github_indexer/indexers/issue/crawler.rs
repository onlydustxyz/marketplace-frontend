use std::sync::Arc;

use async_trait::async_trait;
use derive_new::new;
use domain::{GithubFetchIssueService, GithubIssue};

use super::{super::error::Result, Crawler, IssueId};

#[derive(new)]
pub struct IssueCrawler {
	github_fetch_service: Arc<dyn GithubFetchIssueService>,
}

#[async_trait]
impl Crawler<IssueId, GithubIssue> for IssueCrawler {
	async fn fetch_modified_data(&self, (repo_id, number): &IssueId) -> Result<GithubIssue> {
		let issue = self.github_fetch_service.issue_by_repo_id(*repo_id, *number).await?;
		Ok(issue)
	}

	fn ack(&self, _id: &IssueId, _data: GithubIssue) -> Result<()> {
		Ok(())
	}
}
