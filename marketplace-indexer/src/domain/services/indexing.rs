use std::sync::Arc;

use crate::domain::{BlockchainObserver, EventFilterRepository, EventFilterRepositoryError};
use async_trait::async_trait;
#[cfg(test)]
use mockall::automock;
use thiserror::Error as ThisError;

#[derive(ThisError, Debug)]
pub enum Error {
	#[error("Failed while trying to connect to the indexing node")]
	Connection(#[source] anyhow::Error),
	#[error("Failed while streaming messages")]
	Stream(#[source] anyhow::Error),
	#[error("Invalid message received from node")]
	Invalid(#[source] anyhow::Error),
	#[error(transparent)]
	Filter(#[from] EventFilterRepositoryError),
}

#[cfg_attr(test, automock)]
#[async_trait]
pub trait Service {
	async fn observe_events(
		&self,
		event_filter_repository: Arc<dyn EventFilterRepository>,
		observers: Arc<dyn BlockchainObserver>,
	) -> Result<(), Error>;
}
