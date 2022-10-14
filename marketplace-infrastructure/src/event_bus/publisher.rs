use super::EventBus;
use anyhow::anyhow;
use async_trait::async_trait;
use marketplace_domain::{Event, Publisher, PublisherError};

#[async_trait]
impl Publisher<Event> for EventBus {
	async fn publish(&self, event: Event) -> Result<(), PublisherError> {
		let confirmation = self
			.publish(&serde_json::to_vec(&event)?)
			.await
			.map_err(|e| PublisherError::Send(anyhow!(e)))?;

		match confirmation.is_nack() {
			true => Err(PublisherError::Nack),
			false => Ok(()),
		}
	}
}
