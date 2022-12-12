use super::Bus;
use anyhow::anyhow;
use async_trait::async_trait;
use domain::{Destination, Message, Publisher, PublisherError};

#[async_trait]
impl<M: Message + Send + Sync> Publisher<M> for Bus {
	async fn publish(&self, destination: Destination, message: &M) -> Result<(), PublisherError> {
		let (exchange_name, routing_key) = match destination {
			Destination::Queue(name) => (String::new(), name),
			Destination::Exchange(name) => (name, String::new()),
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
