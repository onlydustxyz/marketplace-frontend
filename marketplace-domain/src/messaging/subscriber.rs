use super::Message;
use async_trait::async_trait;
use std::future::Future;
use thiserror::Error;

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
	// Returning a BadMessage error will discard the current message. It won't be requeued.
	#[error("Invalid message")]
	BadMessage(#[source] anyhow::Error),

	// Returning an InternalError error will stop the consuming of messages. The current message
	// will be automatically requeued.
	#[error("Internal error while processing the message")]
	InternalError(#[from] anyhow::Error),
}

#[async_trait]
pub trait Subscriber<M: Message> {
	async fn subscribe<C, F>(&self, callback: C) -> Result<(), Error>
	where
		C: Fn(M) -> F + Send + Sync,
		F: Future<Output = Result<(), CallbackError>> + Send;
}
