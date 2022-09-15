use std::sync::Arc;

use crate::domain::*;
use async_trait::async_trait;
#[cfg(test)]
use mockall::automock;
use thiserror::Error as ThisError;

#[derive(ThisError, Debug)]
pub enum Error {
	#[error("unable to connect the indexer `{id}`: {details}")]
	Connection { id: IndexerId, details: String },
	#[error("error while sending message to indexing server: {0}")]
	Send(String),
	#[error("error while receiving message from indexing server: {0}")]
	Receive(String),
}

type Result<T> = std::result::Result<T, Error>;

#[cfg_attr(test, automock)]
#[async_trait]
pub trait Service {
	async fn fetch_new_events(
		&self,
		indexer: Indexer,
		observers: Arc<dyn BlockchainObserver>,
	) -> Result<()>;
}
