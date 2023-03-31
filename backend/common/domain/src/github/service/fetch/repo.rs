use async_trait::async_trait;
#[cfg(test)]
use mockall::automock;
use url::Url;

use super::Result;
use crate::{GithubRepo, GithubRepositoryId};

#[cfg_attr(test, automock)]
#[async_trait]
pub trait Service: Send + Sync {
	async fn repo_by_id(&self, id: &GithubRepositoryId) -> Result<GithubRepo>;
	async fn repo_by_url(&self, url: &Url) -> Result<GithubRepo>;
}
