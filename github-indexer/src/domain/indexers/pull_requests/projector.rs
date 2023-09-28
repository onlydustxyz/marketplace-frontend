use std::sync::Arc;

use async_trait::async_trait;
use derive_new::new;
use domain::GithubPullRequest;

use super::{super::error::Result, Projector};
use crate::domain::indexers::Indexer;

#[derive(new)]
pub struct PullRequestsProjector {
	pull_request_indexer: Arc<dyn Indexer<GithubPullRequest, Output = ()>>,
}

#[async_trait]
impl Projector<Vec<GithubPullRequest>> for PullRequestsProjector {
	async fn perform_projections(&self, data: Vec<GithubPullRequest>) -> Result<()> {
		for pull_request in data {
			self.pull_request_indexer.index(&pull_request).await?;
		}
		Ok(())
	}
}
