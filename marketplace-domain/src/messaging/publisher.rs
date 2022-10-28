use super::{Destination, Message};
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
pub trait Publisher<M: Message + Sync>: Send + Sync {
	async fn publish(&self, destination: Destination, message: &M) -> Result<(), Error>;
	async fn publish_many(&self, destination: Destination, messages: &[M]) -> Result<(), Error> {
		for message in messages {
			self.publish(destination.clone(), message).await?;
		}
		Ok(())
	}
}
