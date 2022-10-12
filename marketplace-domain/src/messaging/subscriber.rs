use super::Message;
use anyhow::Result as AnyResult;
use async_trait::async_trait;
use std::future::Future;
use thiserror::Error;

#[derive(Debug, Error)]
pub enum Error {
	#[error("Something happened at infrastructure level")]
	Infrastructure(#[source] anyhow::Error),
	#[error(transparent)]
	Processing(#[from] anyhow::Error),
	#[error("Failed while deserializing message")]
	Deserialize(#[from] serde_json::Error),
}

#[async_trait]
pub trait Subscriber<M: Message> {
	async fn subscribe<C, F>(&self, callback: C) -> Result<(), Error>
	where
		C: Fn(M) -> F + Send + Sync,
		F: Future<Output = AnyResult<()>> + Send;
}
