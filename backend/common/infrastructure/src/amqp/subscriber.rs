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
						"Ignoring event",
					);
					Self::discard_message(&delivery).await
				},
				SubscriberCallbackError::Fatal(error) => {
					error!(
						event = format!("{:?}", message),
						error = error.to_string(),
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

#[cfg(test)]
mod tests {
	use std::sync::{
		atomic::{AtomicI32, Ordering},
		Arc,
	};

	use anyhow::anyhow;
	use domain::{Message, Subscriber, SubscriberCallbackError, SubscriberError};
	use dotenv::dotenv;
	use lapin::options::QueueDeclareOptions;
	use mockall::lazy_static;
	use opentelemetry::propagation::Extractor;
	use rstest::{fixture, rstest};
	use serde::{Deserialize, Serialize};
	use tracing_test::traced_test;

	use crate::amqp::{Bus, Config, ConsumableBus};

	#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
	enum TestMessage {
		Valid,
		Invalid,
		Stop, // special value to end the test
	}
	impl Extractor for TestMessage {
		fn get(&self, _key: &str) -> Option<&str> {
			None
		}

		fn keys(&self) -> Vec<&str> {
			Vec::default()
		}
	}
	impl Message for TestMessage {}

	impl Bus {
		async fn init(self, queue_name: &'static str) -> ConsumableBus {
			self.with_queue(
				queue_name,
				QueueDeclareOptions {
					durable: false,    // do not persist messages
					exclusive: true,   // only one consumer on this queue
					auto_delete: true, // delete the queue at shutdown
					..Default::default()
				},
			)
			.await
			.unwrap()
		}
	}

	#[ctor::ctor]
	fn init_env() {
		dotenv().ok();
	}

	async fn publish_message(bus: &Bus, queue_name: &'static str, message: TestMessage) {
		let confirmation = bus
			.publish("", queue_name, &serde_json::to_vec(&message).unwrap())
			.await
			.unwrap();

		assert!(!confirmation.is_nack());
	}

	async fn publish_badly_formatted_message(bus: &Bus, queue_name: &'static str) {
		let confirmation = bus.publish("", queue_name, "bad-message".as_bytes()).await.unwrap();

		assert!(!confirmation.is_nack());
	}

	fn assert_processing_error_message(error: SubscriberError, expected_error_message: &str) {
		match error {
			SubscriberError::Processing(error) => {
				assert_eq!(error.to_string(), expected_error_message.to_string());
			},
			_ => panic!(),
		}
	}

	async fn run_test(
		consumer: ConsumableBus,
		counter: &'static Arc<AtomicI32>,
		expect_valid_message_count: i32,
	) {
		const STOP_ERROR: &str = "stop the test";
		const BAD_MESSAGE_ERROR: &str = "bad message";

		let result = consumer
			.subscribe(|message: TestMessage| async move {
				match message {
					TestMessage::Valid => {
						counter.fetch_add(1, Ordering::SeqCst);
						Ok(())
					},
					TestMessage::Invalid =>
						Err(SubscriberCallbackError::Discard(anyhow!(BAD_MESSAGE_ERROR))),
					TestMessage::Stop => Err(SubscriberCallbackError::Fatal(anyhow!(STOP_ERROR))),
				}
			})
			.await;

		assert_processing_error_message(result.unwrap_err(), STOP_ERROR);
		assert_eq!(counter.load(Ordering::SeqCst), expect_valid_message_count);
	}

	#[fixture]
	#[once]
	fn config() -> Config {
		// TODO: Find a better way to have a test configuration for integration tests
		Config::new("amqp://127.0.0.1:5672/%2f".to_string())
	}

	#[fixture]
	async fn bus(config: &Config) -> Bus {
		Bus::default(config).await.unwrap()
	}

	#[rstest]
	async fn process_valid_messages_successfully(
		#[future]
		#[from(bus)]
		consumer: Bus,
		#[future]
		#[from(bus)]
		publisher: Bus,
	) {
		const QUEUE: &str = "receive_valid_message_and_process_it_successfully";
		lazy_static! {
			static ref COUNTER: Arc<AtomicI32> = Arc::new(AtomicI32::new(0));
		}

		let consumer = consumer.await.init(QUEUE).await;
		let publisher = publisher.await;
		publish_message(&publisher, QUEUE, TestMessage::Valid).await;
		publish_message(&publisher, QUEUE, TestMessage::Valid).await;
		publish_message(&publisher, QUEUE, TestMessage::Stop).await;

		run_test(consumer, &COUNTER, 2).await;
	}

	#[rstest]
	#[traced_test]
	async fn ignore_non_deserializable_message(
		#[future]
		#[from(bus)]
		consumer: Bus,
		#[future]
		#[from(bus)]
		publisher: Bus,
	) {
		const QUEUE: &str = "ignore_non_deserializable_message";
		lazy_static! {
			static ref COUNTER: Arc<AtomicI32> = Arc::new(AtomicI32::new(0));
		}

		let consumer = consumer.await.init(QUEUE).await;
		let publisher = publisher.await;
		publish_message(&publisher, QUEUE, TestMessage::Valid).await;
		publish_badly_formatted_message(&publisher, QUEUE).await;
		publish_message(&publisher, QUEUE, TestMessage::Valid).await;
		publish_message(&publisher, QUEUE, TestMessage::Stop).await;

		run_test(consumer, &COUNTER, 2).await;

		assert!(logs_contain("Failed to deserialize message"));
	}

	#[rstest]
	#[traced_test]
	async fn discard_invalid_message(
		#[future]
		#[from(bus)]
		consumer: Bus,
		#[future]
		#[from(bus)]
		publisher: Bus,
	) {
		const QUEUE: &str = "discard_invalid_message";
		lazy_static! {
			static ref COUNTER: Arc<AtomicI32> = Arc::new(AtomicI32::new(0));
		}

		let consumer = consumer.await.init(QUEUE).await;
		let publisher = publisher.await;
		publish_message(&publisher, QUEUE, TestMessage::Valid).await;
		publish_message(&publisher, QUEUE, TestMessage::Invalid).await;
		publish_message(&publisher, QUEUE, TestMessage::Valid).await;
		publish_message(&publisher, QUEUE, TestMessage::Stop).await;

		run_test(consumer, &COUNTER, 2).await;

		assert!(logs_contain("Ignoring event"));
		assert!(logs_contain("error=\"bad message\""));
	}

	#[rstest]
	#[traced_test]
	async fn terminate_message_consuming_because_of_internal_error(
		#[future]
		#[from(bus)]
		consumer: Bus,
		#[future]
		#[from(bus)]
		publisher: Bus,
	) {
		const QUEUE: &str = "terminate_message_consuming_because_of_internal_error";
		const ERROR: &str = "some internal error occurred";

		let consumer = consumer.await.init(QUEUE).await;
		let publisher = publisher.await;
		publish_message(&publisher, QUEUE, TestMessage::Valid).await;

		let result = consumer
			.subscribe(|message: TestMessage| async move {
				assert_eq!(message, TestMessage::Valid);
				Err(SubscriberCallbackError::Fatal(anyhow!(ERROR)))
			})
			.await;

		assert_processing_error_message(result.unwrap_err(), ERROR);

		assert!(logs_contain("Fatal error while processing the event"));
		assert!(logs_contain("error=\"some internal error occurred\""));
	}
}
