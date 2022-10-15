use super::Bus;
use anyhow::anyhow;
use async_trait::async_trait;
use log::error;
use marketplace_domain::{Message, Subscriber, SubscriberError};
use std::future::Future;

#[async_trait]
impl<M: Message + Send + Sync> Subscriber<M> for Bus {
	async fn subscribe<C, F>(&self, callback: C) -> Result<(), SubscriberError>
	where
		C: Fn(M) -> F + Send + Sync,
		F: Future<Output = Result<(), anyhow::Error>> + Send,
	{
		while let Some(delivery) =
			self.consume().await.map_err(|e| SubscriberError::Receive(anyhow!(e)))?
		{
			let message: M = serde_json::from_slice(&delivery.data)?;
			match callback(message).await {
				Ok(_) => delivery
					.ack(Default::default())
					.await
					.map_err(|e| SubscriberError::Ack(anyhow!(e)))?,

				Err(error) => {
					error!("{error}");
					delivery
						.nack(Default::default())
						.await
						.map_err(|e| SubscriberError::Nack(anyhow!(e)))?;

					return Err(SubscriberError::Processing(error));
				},
			}
		}

		Ok(())
	}
}
