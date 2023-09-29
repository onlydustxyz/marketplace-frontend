use std::sync::Arc;

use async_trait::async_trait;
use derive_new::new;
use domain::GithubIssue;
use infrastructure::dbclient::Repository;

use super::{super::error::Result, Projector};
use crate::{
	domain::indexers::contributors_projector::ContributorsProjector,
	models::ContributionsRepository,
};

#[derive(new)]
pub struct IssuesProjector {
	github_issues_repository: Arc<dyn Repository<crate::models::GithubIssue>>,
	contributions_repository: Arc<dyn ContributionsRepository>,
	contributors_projector: ContributorsProjector,
}

#[async_trait]
impl Projector<Vec<GithubIssue>> for IssuesProjector {
	async fn perform_projections(&self, data: Vec<GithubIssue>) -> Result<()> {
		let repo_id = data.first().map(|issue| issue.repo_id);

		for issue in &data {
			let issue: crate::models::GithubIssue = issue.clone().into();
			self.github_issues_repository.upsert(issue.clone())?;
			self.contributions_repository.upsert_from_github_issue(issue.clone())?;
		}
		if let Some(repo_id) = repo_id {
			self.contributors_projector.perform_projections(repo_id).await?;
		}
		Ok(())
	}
}
