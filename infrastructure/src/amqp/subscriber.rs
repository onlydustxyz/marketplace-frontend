use super::ConsumableBus;
use anyhow::anyhow;
use async_trait::async_trait;
use domain::{Message, Subscriber, SubscriberCallbackError, SubscriberError};
use lapin::{message::Delivery, options::BasicNackOptions};
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
					SubscriberCallbackError::Discard(error) => {
						error!(
							error = error.to_string(),
							message = format!("{:?}", delivery.data),
							"Ignoring message",
						);
						Self::discard_message(&delivery).await?;
						continue;
					},
					SubscriberCallbackError::Fatal(error) => {
						error!(
							error = error.to_string(),
							message = format!("{:?}", delivery.data),
							"Fatal error while processing the message",
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

#[cfg(test)]

mod tests {
	use crate::amqp::{Bus, ConsumableBus};
	use anyhow::anyhow;
	use domain::{Message, Subscriber, SubscriberCallbackError, SubscriberError};
	use lapin::options::QueueDeclareOptions;
	use mockall::lazy_static;
	use rstest::rstest;
	use serde::{Deserialize, Serialize};
	use std::sync::{
		atomic::{AtomicI32, Ordering},
		Arc,
	};
	use tracing_test::traced_test;

	#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
	enum TestMessage {
		Valid,
		Invalid,
		Stop, // special value to end the test
	}
	impl Message for TestMessage {}

	async fn init_consumer(queue_name: &'static str) -> ConsumableBus {
		Bus::default()
			.await
			.unwrap()
			.with_queue(
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

	async fn publish_message(queue_name: &'static str, message: TestMessage) {
		let confirmation = Bus::default()
			.await
			.unwrap()
			.publish(
				&*String::new(),
				queue_name,
				&serde_json::to_vec(&message).unwrap(),
			)
			.await
			.unwrap();

		assert!(!confirmation.is_nack());
	}

	async fn publish_badly_formatted_message(queue_name: &'static str) {
		let confirmation = Bus::default()
			.await
			.unwrap()
			.publish(&*String::new(), queue_name, "bad-message".as_bytes())
			.await
			.unwrap();

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

	#[rstest]
	#[cfg_attr(
		not(feature = "with_infrastructure_tests"),
		ignore = "infrastructure test"
	)]
	async fn process_valid_messages_successfully() {
		const QUEUE: &str = "receive_valid_message_and_process_it_successfully";
		lazy_static! {
			static ref COUNTER: Arc<AtomicI32> = Arc::new(AtomicI32::new(0));
		}

		let consumer = init_consumer(QUEUE).await;
		publish_message(QUEUE, TestMessage::Valid).await;
		publish_message(QUEUE, TestMessage::Valid).await;
		publish_message(QUEUE, TestMessage::Stop).await;

		run_test(consumer, &*COUNTER, 2).await;
	}

	#[rstest]
	#[traced_test]
	#[cfg_attr(
		not(feature = "with_infrastructure_tests"),
		ignore = "infrastructure test"
	)]
	async fn ignore_non_deserializable_message() {
		const QUEUE: &str = "ignore_non_deserializable_message";
		lazy_static! {
			static ref COUNTER: Arc<AtomicI32> = Arc::new(AtomicI32::new(0));
		}

		let consumer = init_consumer(QUEUE).await;
		publish_message(QUEUE, TestMessage::Valid).await;
		publish_badly_formatted_message(QUEUE).await;
		publish_message(QUEUE, TestMessage::Valid).await;
		publish_message(QUEUE, TestMessage::Stop).await;

		run_test(consumer, &*COUNTER, 2).await;

		assert!(logs_contain("Failed to deserialize message"));
	}

	#[rstest]
	#[traced_test]
	#[cfg_attr(
		not(feature = "with_infrastructure_tests"),
		ignore = "infrastructure test"
	)]
	async fn discard_invalid_message() {
		const QUEUE: &str = "discard_invalid_message";
		lazy_static! {
			static ref COUNTER: Arc<AtomicI32> = Arc::new(AtomicI32::new(0));
		}

		let consumer = init_consumer(QUEUE).await;
		publish_message(QUEUE, TestMessage::Valid).await;
		publish_message(QUEUE, TestMessage::Invalid).await;
		publish_message(QUEUE, TestMessage::Valid).await;
		publish_message(QUEUE, TestMessage::Stop).await;

		run_test(consumer, &*COUNTER, 2).await;

		assert!(logs_contain("Ignoring message error=\"bad message\""));
	}

	#[rstest]
	#[traced_test]
	#[cfg_attr(
		not(feature = "with_infrastructure_tests"),
		ignore = "infrastructure test"
	)]
	async fn terminate_message_consuming_because_of_internal_error() {
		const QUEUE: &str = "terminate_message_consuming_because_of_internal_error";
		const ERROR: &str = "some internal error occurred";

		let consumer = init_consumer(QUEUE).await;
		publish_message(QUEUE, TestMessage::Valid).await;

		let result = consumer
			.subscribe(|message: TestMessage| async move {
				assert_eq!(message, TestMessage::Valid);
				Err(SubscriberCallbackError::Fatal(anyhow!(ERROR)))
			})
			.await;

		assert_processing_error_message(result.unwrap_err(), ERROR);

		assert!(logs_contain(
			"Fatal error while processing the message error=\"some internal error occurred\""
		));
	}
}
