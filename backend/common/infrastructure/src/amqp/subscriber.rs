/// A module that implements a `Subscriber` for a consumable AMQP bus
use std::future::Future;

use anyhow::anyhow;
use async_trait::async_trait;
use domain::{Message, Subscriber, SubscriberCallbackError, SubscriberError};
use lapin::{message::Delivery, options::BasicNackOptions};
use olog::error;
use opentelemetry::{propagation::TextMapPropagator, sdk::propagation::TraceContextPropagator};
use serde_json::Error;
use tracing::{instrument, Span};
use tracing_opentelemetry::OpenTelemetrySpanExt;

use super::ConsumableBus;

#[async_trait]
impl<M: Message + Send + Sync> Subscriber<M> for ConsumableBus {
    /// Subscribes to the queue and calls the callback function for each message received from the queue
    ///
    /// When the callback returns `Ok(())`, the message is acknowledged and removed from the queue.
    /// If the callback returns `Err(SubscriberCallbackError::Discard(error))`, the message is discarded and removed from the queue.
    /// If the callback returns `Err(SubscriberCallbackError::Fatal(error))`, the message is acknowledged and removed from the queue, and the subscription is terminated.
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
                        content = format!("{:?}", delivery.data),
                        error = error.to_string(),
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
    /// Processes the received event message
    ///
    /// - Uses `callback` to process the message;
    /// - The `parent_context` of the current OpenTelemetry span is set to the value extracted from the message data;
    /// - If the callback returns `Ok(_)`, the incoming event is `ack`nowledged;
    /// - If the callback returns `Err(SubscriberCallbackError::Discard(error))`, the incoming event is `nack`nowledged with `requeue=false`, and the method returns `Ok(())`;
    /// - If the callback returns `Err(SubscriberCallbackError::Fatal(error))`, the incoming event is `ack`nowledged, `SubscriberError::Processing(error)` is returned, and the subscription is terminated.
    #[instrument(skip(self, callback, delivery))]
    async fn process_event<M, C, F>(
        &self,
        callback: C,
        message: M,
        delivery: Delivery,
    ) -> Result<(), SubscriberError>
    where
        M: Message + Send + Sync,
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
                        event = format!("{:?}", message),
                        error = error.to_string(),
                        queue_name = self.queue_name(),
                        "Ignoring event",
                    );
                    Self::discard_message(&delivery).await
                },
                SubscriberCallbackError::Fatal(error) => {
                    error!(
                        event = format!("{:?}", message),
                        error = error.to_string(),
                        queue_name = self.queue_name(),
                        "Fatal error while processing the event",
                    );
                    Err(SubscriberError::Processing(error))
                },
            },
        }
    }

    /// Discards the message by sending a `nack` with `requeue=false` to the broker
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