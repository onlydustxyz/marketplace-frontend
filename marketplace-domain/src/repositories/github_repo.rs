use crate::{GithubProjectId, GithubRepo};
use async_trait::async_trait;
#[cfg(test)]
use mockall::automock;
use thiserror::Error;

#[derive(Debug, Error)]
pub enum Error {
	#[error("Something happened at infrastructure level: {0}")]
	Infrastructure(String),
}

#[cfg_attr(test, automock)]
#[async_trait]
pub trait Repository: Send + Sync {
	async fn find(&self, project_id: &GithubProjectId) -> Result<GithubRepo, Error>;
}
