use std::sync::Arc;

use async_trait::async_trait;
use derive_new::new;
use domain::{GithubFullPullRequest, GithubPullRequest};

use super::{super::error::Result, Projector};
use crate::{
	github_indexer::indexers::contributors_projector::ContributorsProjector,
	models::{ContributionsRepository, GithubPullRequestRepository},
};

#[derive(new)]
pub struct PullRequestProjector {
	github_pull_requests_repository: Arc<dyn GithubPullRequestRepository>,
	contributions_repository: Arc<dyn ContributionsRepository>,
	contributors_projector: ContributorsProjector,
}

#[async_trait]
impl Projector<GithubPullRequest, Option<GithubFullPullRequest>> for PullRequestProjector {
	async fn perform_projections(
		&self,
		_pull_request: &GithubPullRequest,
		data: Option<GithubFullPullRequest>,
	) -> Result<()> {
		if let Some(pull_request) = data {
			let pull_request: crate::models::GithubPullRequest = pull_request.into();

			self.github_pull_requests_repository.upsert(pull_request.clone())?;

			self.contributions_repository
				.upsert_from_github_pull_request(pull_request.clone())?;

			self.contributors_projector
				.perform_projections(&pull_request.inner.repo_id, ())
				.await?;
		}
		Ok(())
	}
}
