use crate::*;
use async_trait::async_trait;
#[cfg(test)]
use mockall::automock;
use thiserror::Error;

#[derive(Debug, Error)]
pub enum Error {
	#[error("Contributor does not exist")]
	NotFound(#[source] anyhow::Error),
	#[error("Something happend at the infrastructure level")]
	Infrastructure(#[source] anyhow::Error),
}

#[cfg_attr(test, automock)]
#[async_trait]
pub trait Service: Send + Sync {
	async fn contributor_by_id(&self, contributor_id: &ContributorId)
	-> Result<Contributor, Error>;
}
