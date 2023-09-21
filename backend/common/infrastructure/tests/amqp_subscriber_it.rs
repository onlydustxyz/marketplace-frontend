mod context;

use std::sync::{
	atomic::{AtomicI32, Ordering},
	Arc,
};

use anyhow::anyhow;
use domain::{Subscriber, SubscriberCallbackError, SubscriberError};
use infrastructure::amqp::{Bus, ConsumableBus, Unique};
use lapin::options::QueueDeclareOptions;
use mockall::lazy_static;
use opentelemetry::propagation::Extractor;
use rstest::rstest;
use serde::{Deserialize, Serialize};
use testcontainers::clients::Cli;
use tracing_test::traced_test;

use crate::context::amqp::{docker, Context};

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

async fn init(bus: Bus, queue_name: &'static str) -> ConsumableBus {
	bus.with_queue(
		queue_name.to_string(),
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

async fn publish_message(bus: &Bus, queue_name: &'static str, message: TestMessage) {
	let confirmation = bus.publish("", queue_name, message.unique()).await.unwrap();

	assert!(!confirmation.is_nack());
}

async fn publish_badly_formatted_message(bus: &Bus, queue_name: &'static str) {
	let confirmation =
		bus.publish("", queue_name, String::from("bad-message").unique()).await.unwrap();

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
async fn process_valid_messages_successfully(docker: &'static Cli) {
	let context = Context::new(docker).await;
	let (consumer, publisher) = (context.consumer, context.publisher);
	const QUEUE: &str = "receive_valid_message_and_process_it_successfully";
	lazy_static! {
		static ref COUNTER: Arc<AtomicI32> = Arc::new(AtomicI32::new(0));
	}

	let consumer = init(consumer, QUEUE).await;
	publish_message(&publisher, QUEUE, TestMessage::Valid).await;
	publish_message(&publisher, QUEUE, TestMessage::Valid).await;
	publish_message(&publisher, QUEUE, TestMessage::Stop).await;

	run_test(consumer, &COUNTER, 2).await;
}

#[rstest]
#[traced_test]
async fn ignore_non_deserializable_message(docker: &'static Cli) {
	let context = Context::new(docker).await;
	let (consumer, publisher) = (context.consumer, context.publisher);
	const QUEUE: &str = "ignore_non_deserializable_message";
	lazy_static! {
		static ref COUNTER: Arc<AtomicI32> = Arc::new(AtomicI32::new(0));
	}

	let consumer = init(consumer, QUEUE).await;
	publish_message(&publisher, QUEUE, TestMessage::Valid).await;
	publish_badly_formatted_message(&publisher, QUEUE).await;
	publish_message(&publisher, QUEUE, TestMessage::Valid).await;
	publish_message(&publisher, QUEUE, TestMessage::Stop).await;

	run_test(consumer, &COUNTER, 2).await;

	assert!(logs_contain("Failed to deserialize message"));
}

#[rstest]
#[traced_test]
async fn discard_invalid_message(docker: &'static Cli) {
	let context = Context::new(docker).await;
	let (consumer, publisher) = (context.consumer, context.publisher);
	const QUEUE: &str = "discard_invalid_message";
	lazy_static! {
		static ref COUNTER: Arc<AtomicI32> = Arc::new(AtomicI32::new(0));
	}

	let consumer = init(consumer, QUEUE).await;
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
async fn terminate_message_consuming_because_of_internal_error(docker: &'static Cli) {
	let context = Context::new(docker).await;
	let (consumer, publisher) = (context.consumer, context.publisher);
	const QUEUE: &str = "terminate_message_consuming_because_of_internal_error";
	const ERROR: &str = "some internal error occurred";

	let consumer = init(consumer, QUEUE).await;
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
