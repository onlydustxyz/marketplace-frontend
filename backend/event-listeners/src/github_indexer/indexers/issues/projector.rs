use std::sync::Arc;

use async_trait::async_trait;
use derive_new::new;
use domain::{GithubIssue, GithubRepoId};
use infrastructure::database::Repository;

use super::{super::error::Result, Projector};
use crate::{
	github_indexer::indexers::contributors_projector::ContributorsProjector,
	models::ContributionsRepository,
};

#[derive(new)]
pub struct IssuesProjector {
	github_issues_repository: Arc<dyn Repository<crate::models::GithubIssue>>,
	contributions_repository: Arc<dyn ContributionsRepository>,
	contributors_projector: ContributorsProjector,
}

#[async_trait]
impl Projector<GithubRepoId, Vec<GithubIssue>> for IssuesProjector {
	async fn perform_projections(&self, id: &GithubRepoId, data: Vec<GithubIssue>) -> Result<()> {
		for issue in &data {
			let issue: crate::models::GithubIssue = issue.clone().into();
			self.github_issues_repository.upsert(issue.clone())?;
			self.contributions_repository.upsert_from_github_issue(issue.clone())?;
		}
		if !data.is_empty() {
			self.contributors_projector.perform_projections(id, ()).await?;
		}
		Ok(())
	}
}
