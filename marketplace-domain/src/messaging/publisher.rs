use super::Message;
use async_trait::async_trait;
use thiserror::Error;

#[derive(Debug, Error)]
pub enum Error {
	#[error("Failed while publishing message")]
	Send(#[from] anyhow::Error),
	#[error("Consumer did not acknowledge the message")]
	Nack,
	#[error("Failed while serializing message")]
	Serialize(#[from] serde_json::Error),
}

#[async_trait]
pub trait Publisher<M: Message>: Send + Sync {
	async fn publish(&self, destination: &str, message: &M) -> Result<(), Error>;
}
