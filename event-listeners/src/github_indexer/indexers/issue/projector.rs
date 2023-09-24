use std::sync::Arc;

use async_trait::async_trait;
use derive_new::new;
use domain::GithubIssue;
use infrastructure::database::Repository;

use super::{super::error::Result, Projector};

#[derive(new)]
pub struct IssueProjector {
	github_issues_repository: Arc<dyn Repository<crate::models::GithubIssue>>,
}

#[async_trait]
impl Projector<GithubIssue> for IssueProjector {
	async fn perform_projections(&self, issue: GithubIssue) -> Result<()> {
		self.github_issues_repository.upsert(issue.into())?;
		Ok(())
	}
}
