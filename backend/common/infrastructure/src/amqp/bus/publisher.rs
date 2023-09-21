use anyhow::anyhow;
use async_trait::async_trait;
use domain::{Message, Publisher, PublisherError};

use super::{Destination, PublisherBus};

#[async_trait]
impl<M: Message + Send + Sync> Publisher<M> for PublisherBus {
	async fn publish(&self, message: &M) -> Result<(), PublisherError> {
		let (exchange_name, routing_key) = match self.destination.clone() {
			Destination::Queue(name) => (String::new(), name),
			Destination::Exchange(name) => (name, String::new()),
		};

		let confirmation = self
			.bus
			.publish(&exchange_name, &routing_key, &serde_json::to_vec(message)?)
			.await
			.map_err(|e| PublisherError::Send(anyhow!(e)))?;

		match confirmation.is_nack() {
			true => Err(PublisherError::Nack),
			false => Ok(()),
		}
	}
}
