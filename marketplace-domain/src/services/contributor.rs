use crate::*;
use async_trait::async_trait;
use mockall::automock;
use thiserror::Error;

#[derive(Debug, Error)]
pub enum Error {
	#[error("Something happend at the infrastructure level")]
	Infrastructure(#[source] anyhow::Error),
}

#[async_trait]
#[automock]
pub trait Service: Send + Sync {
	async fn contributor_by_id(&self, contributor_id: &ContributorId)
	-> Result<Contributor, Error>;
}
