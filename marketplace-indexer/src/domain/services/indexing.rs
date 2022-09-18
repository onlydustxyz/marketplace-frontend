use std::sync::Arc;

use crate::domain::BlockchainObserver;
use async_trait::async_trait;
#[cfg(test)]
use mockall::automock;
use thiserror::Error as ThisError;

#[derive(ThisError, Debug)]
pub enum Error {
	#[error("unable to connect the indexing node")]
	Connection(#[source] anyhow::Error),
}

#[cfg_attr(test, automock)]
#[async_trait]
pub trait Service {
	async fn observe_events(&self, observers: Arc<dyn BlockchainObserver>) -> Result<(), Error>;
}
