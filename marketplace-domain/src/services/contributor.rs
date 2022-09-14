use crate::*;
use async_trait::async_trait;
#[cfg(test)]
use mockall::automock;
use thiserror::Error;

#[derive(Debug, Error)]
pub enum Error {
	#[error(transparent)]
	NotFound(anyhow::Error),
	#[error(transparent)]
	Infrastructure(anyhow::Error),
}

#[cfg_attr(test, automock)]
#[async_trait]
pub trait Service: Send + Sync {
	async fn contributor_by_id(&self, contributor_id: &ContributorId)
	-> Result<Contributor, Error>;
}
