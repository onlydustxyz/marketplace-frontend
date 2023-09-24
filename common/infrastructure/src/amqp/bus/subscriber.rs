use std::future::Future;

use anyhow::anyhow;
use async_trait::async_trait;
use domain::{Message, Subscriber, SubscriberCallbackError, SubscriberError};
use lapin::{message::Delivery, options::BasicNackOptions};
use olog::{error, IntoField};
use opentelemetry::{
	propagation::{Extractor, TextMapPropagator},
	sdk::propagation::TraceContextPropagator,
};
use serde_json::Error;
use tracing::{instrument, Span};
use tracing_opentelemetry::OpenTelemetrySpanExt;

use super::ConsumableBus;

#[async_trait]
impl<M: Message + Extractor + Send + Sync> Subscriber<M> for ConsumableBus {
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
						error = error.to_field(),
						content = format!("{:?}", delivery.data),
						queue_name = self.queue_name(),
						"Failed to deserialize message",
					);
					Self::discard_message(&delivery).await?;
					continue;
				},
			};

			self.process_event(&callback, message, delivery).await?;
		}

		Ok(())
	}
}

impl ConsumableBus {
	#[instrument(skip(self, callback, delivery))]
	async fn process_event<M, C, F>(
		&self,
		callback: C,
		message: M,
		delivery: Delivery,
	) -> Result<(), SubscriberError>
	where
		M: Message + Send + Sync + Extractor,
		C: Fn(M) -> F + Send + Sync,
		F: Future<Output = Result<(), SubscriberCallbackError>> + Send,
	{
		// Extract parent trace context from message data
		let parent_context = TraceContextPropagator::new().extract(&message);
		Span::current().set_parent(parent_context);

		match callback(message.clone()).await {
			Ok(_) => delivery
				.ack(Default::default())
				.await
				.map_err(|e| SubscriberError::Ack(anyhow!(e))),

			Err(error) => match error {
				SubscriberCallbackError::Discard(error) => {
					error!(
						error = error.to_field(),
						event = format!("{:?}", message),
						queue_name = self.queue_name(),
						"Ignoring event",
					);
					Self::discard_message(&delivery).await
				},
				SubscriberCallbackError::Fatal(error) => {
					error!(
						error = error.to_field(),
						event = format!("{:?}", message),
						queue_name = self.queue_name(),
						"Fatal error while processing the event",
					);
					Err(SubscriberError::Processing(error))
				},
			},
		}
	}

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
