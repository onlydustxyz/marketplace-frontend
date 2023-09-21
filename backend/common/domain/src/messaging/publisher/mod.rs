use std::fmt::Debug;

use async_trait::async_trait;
pub use message::Message;
#[cfg(test)]
use mockall::automock;
use thiserror::Error;

pub mod composite;
mod message;

#[derive(Debug, Error)]
pub enum Error {
	#[error("Failed while publishing message")]
	Send(#[from] anyhow::Error),
	#[error("Consumer did not acknowledge the message")]
	Nack,
	#[error("Failed while serializing message")]
	Serialize(#[from] serde_json::Error),
}

#[async_trait]
#[cfg_attr(test, automock)]
pub trait Publisher<M: Message + Sync + Send>: Send + Sync {
	async fn publish(&self, message: &M) -> Result<(), Error>;
	async fn publish_many(&self, messages: &[M]) -> Result<(), Error> {
		for message in messages {
			self.publish(message).await?;
		}
		Ok(())
	}
}

#[cfg(test)]
mod tests {
	use futures::FutureExt;
	use mockall::predicate::eq;
	use olog::opentelemetry::propagation::Extractor;
	use rstest::rstest;
	use serde::{Deserialize, Serialize};

	use super::*;

	#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
	enum TestMessage {
		Msg1,
		Msg2,
		Msg3,
	}

	struct TestPublisher(MockPublisher<TestMessage>);

	#[async_trait]
	impl Publisher<TestMessage> for TestPublisher {
		async fn publish(&self, message: &TestMessage) -> Result<(), Error> {
			self.0.publish(message).await
		}
	}
	impl Extractor for TestMessage {
		fn get(&self, _key: &str) -> Option<&str> {
			None
		}

		fn keys(&self) -> Vec<&str> {
			Vec::default()
		}
	}

	#[rstest]
	async fn publish_many_messages() {
		let mut publisher = MockPublisher::<TestMessage>::new();

		publisher
			.expect_publish()
			.with(eq(TestMessage::Msg1))
			.once()
			.returning(|_| async { Ok(()) }.boxed());

		publisher
			.expect_publish()
			.with(eq(TestMessage::Msg2))
			.once()
			.returning(|_| async { Ok(()) }.boxed());

		publisher
			.expect_publish()
			.with(eq(TestMessage::Msg3))
			.once()
			.returning(|_| async { Ok(()) }.boxed());

		let result = TestPublisher(publisher)
			.publish_many(&[TestMessage::Msg1, TestMessage::Msg2, TestMessage::Msg3])
			.await;
		assert!(result.is_ok(), "{}", result.err().unwrap());
	}
}
