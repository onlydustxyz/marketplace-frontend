use super::EventBus;
use anyhow::anyhow;
use async_trait::async_trait;
use marketplace_domain::{Message, Publisher, PublisherError};

#[async_trait]
impl<M: Message + Send + Sync> Publisher<M> for EventBus {
	async fn publish(&self, destination: &str, message: &M) -> Result<(), PublisherError> {
		let confirmation = self
			.publish(destination, &serde_json::to_vec(message)?)
			.await
			.map_err(|e| PublisherError::Send(anyhow!(e)))?;

		match confirmation.is_nack() {
			true => Err(PublisherError::Nack),
			false => Ok(()),
		}
	}
}
