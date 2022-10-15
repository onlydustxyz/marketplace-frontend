use super::EventBus;
use anyhow::anyhow;
use async_trait::async_trait;
use marketplace_domain::{Destination, Message, Publisher, PublisherError};

#[async_trait]
impl<M: Message + Send + Sync> Publisher<M> for EventBus {
	async fn publish(&self, destination: Destination, message: &M) -> Result<(), PublisherError> {
		let (exchange_name, routing_key) = match destination {
			Destination::Queue(name) => (String::new(), name),
			Destination::Exchange { name, topic } => (name, topic),
		};

		let confirmation = self
			.publish(&exchange_name, &routing_key, &serde_json::to_vec(message)?)
			.await
			.map_err(|e| PublisherError::Send(anyhow!(e)))?;

		match confirmation.is_nack() {
			true => Err(PublisherError::Nack),
			false => Ok(()),
		}
	}
}
