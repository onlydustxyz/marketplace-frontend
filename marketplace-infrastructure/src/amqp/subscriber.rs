use super::ConsumableBus;
use anyhow::anyhow;
use async_trait::async_trait;
use lapin::{message::Delivery, options::BasicNackOptions};
use marketplace_domain::{Message, Subscriber, SubscriberCallbackError, SubscriberError};
use serde_json::Error;
use std::future::Future;
use tracing::error;

#[async_trait]
impl<M: Message + Send + Sync> Subscriber<M> for ConsumableBus {
	async fn subscribe<C, F>(&self, callback: C) -> Result<(), SubscriberError>
	where
		C: Fn(M) -> F + Send + Sync,
		F: Future<Output = Result<(), SubscriberCallbackError>> + Send,
	{
		while let Some(delivery) =
			self.consume().await.map_err(|e| SubscriberError::Receive(anyhow!(e)))?
		{
			let message: Result<M, Error> = serde_json::from_slice(&delivery.data);
			let message = match message {
				Ok(message) => message,
				Err(error) => {
					error!(
						error = error.to_string(),
						message = format!("{:?}", delivery.data),
						"Failed to deserialize message",
					);
					Self::discard_message(&delivery).await?;
					continue;
				},
			};

			match callback(message).await {
				Ok(_) => delivery
					.ack(Default::default())
					.await
					.map_err(|e| SubscriberError::Ack(anyhow!(e)))?,

				Err(error) => match error {
					SubscriberCallbackError::BadMessage(error) => {
						error!(
							error = error.to_string(),
							message = format!("{:?}", delivery.data),
							"Invalid message",
						);
						Self::discard_message(&delivery).await?;
						continue;
					},
					SubscriberCallbackError::InternalError(error) => {
						error!(
							error = error.to_string(),
							message = format!("{:?}", delivery.data),
							"Failed to process message due to internal error",
						);
						return Err(SubscriberError::Processing(error));
					},
				},
			}
		}

		Ok(())
	}
}

impl ConsumableBus {
	async fn discard_message(delivery: &Delivery) -> Result<(), SubscriberError> {
		delivery
			.nack(BasicNackOptions {
				requeue: false,
				..Default::default()
			})
			.await
			.map_err(|e| SubscriberError::Nack(anyhow!(e)))
	}
}
