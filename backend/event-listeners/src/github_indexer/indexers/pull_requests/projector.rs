use std::sync::Arc;

use async_trait::async_trait;
use derive_new::new;
use domain::{GithubPullRequest, GithubRepoId};

use super::{super::error::Result, Projector};
use crate::github_indexer::indexers::Indexer;

#[derive(new)]
pub struct PullRequestsProjector {
	pull_request_indexer: Arc<dyn Indexer<GithubPullRequest>>,
}

#[async_trait]
impl Projector<GithubRepoId, Vec<GithubPullRequest>> for PullRequestsProjector {
	async fn perform_projections(
		&self,
		_id: &GithubRepoId,
		data: Vec<GithubPullRequest>,
	) -> Result<()> {
		for pull_request in data {
			self.pull_request_indexer.index(&pull_request).await?;
		}
		Ok(())
	}
}
