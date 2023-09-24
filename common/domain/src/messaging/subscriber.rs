use std::future::Future;

use async_trait::async_trait;
use thiserror::Error;

use super::Message;

#[derive(Debug, Error)]
pub enum Error {
	#[error("Failed while receiving data from queue")]
	Receive(#[source] anyhow::Error),
	#[error("Failed while acknowledging message to publisher")]
	Ack(#[source] anyhow::Error),
	#[error("Failed while sending NACK to publisher")]
	Nack(#[source] anyhow::Error),
	#[error(transparent)]
	Processing(#[from] anyhow::Error),
	#[error("Failed while deserializing message")]
	Deserialize(#[from] serde_json::Error),
}

#[derive(Debug, Error)]
pub enum CallbackError {
	// Returning a Discard error will discard the current message and process the next one. It
	// won't be requeued.
	#[error("Ignoring message")]
	Discard(#[source] anyhow::Error),

	// Returning an Fatal error will stop the consuming of messages. The current message
	// must be automatically requeued by the message broker.
	#[error("Fatal error while processing the message")]
	Fatal(#[source] anyhow::Error),
}

#[async_trait]
pub trait Subscriber<M: Message> {
	async fn subscribe<C, F>(&self, callback: C) -> Result<(), Error>
	where
		C: Fn(M) -> F + Send + Sync,
		F: Future<Output = Result<(), CallbackError>> + Send;
}
