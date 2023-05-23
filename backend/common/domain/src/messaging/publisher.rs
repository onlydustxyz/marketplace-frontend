/// A trait to publish messages to a destination.
#[async_trait]
pub trait Publisher<M: Message + Sync + Send>: Send + Sync {
    /// Publish a message to a destination.
    /// # Arguments
    /// * `destination` - The destination to publish the message to.
    /// * `message` - The message to publish.
    ///
    /// # Returns
    /// Returns `Ok(())` if the operation is successful or an `Error`
    /// otherwise.
    async fn publish(&self, destination: Destination, message: &M) -> Result<(), Error>;

    /// Publish multiple messages to a destination.
    /// # Arguments
    /// * `destination` - The destination to publish the messages to.
    /// * `messages` - The messages to publish.
    ///
    /// # Returns
    /// Returns `Ok(())` if the operation is successful or an `Error`
    /// otherwise.
    async fn publish_many(&self, destination: Destination, messages: &[M]) -> Result<(), Error>;
}

/// Destination to publish messages to.
#[derive(Debug, Clone, PartialEq, Eq)]
pub enum Destination {
    /// A destination for queue.
    Queue(String),
}

/// Error enum for any errors that occur during publishing.
#[derive(Debug, Error)]
pub enum Error {
    /// Failed while publishing message.
    #[error("Failed while publishing message")]
    Send(#[from] anyhow::Error),
    /// Consumer did not acknowledge the message.
    #[error("Consumer did not acknowledge the message")]
    Nack,
    /// Failed while serializing message.
    #[error("Failed while serializing message")]
    Serialize(#[from] serde_json::Error),
}

#[cfg(test)]
mod tests {
    use futures::FutureExt;
    use mockall::{automock, predicate::eq};
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

    /// Mock implementation of `Publisher` trait.
    #[derive(Clone)]
    struct MockPublisher<M>
    where
        M: Message + Sync + Send,
    {
        publish: std::sync::Arc<dyn Fn(Destination, M) -> Box<dyn futures::Future<Output = Result<(), Error>> + Send + Sync> + Send + Sync>,
    }

    #[async_trait]
    impl<M> Publisher<M> for MockPublisher<M>
    where
        M: Message + Sync + Send,
    {
        async fn publish(&self, destination: Destination, message: &M) -> Result<(), Error> {
            (self.publish)(destination, message.clone()).await
        }

        async fn publish_many(&self, destination: Destination, messages: &[M]) -> Result<(), Error> {
            for message in messages {
                self.publish(destination.clone(), message.clone()).await?;
            }
            Ok(())
        }
    }

    impl<M> MockPublisher<M>
    where
        M: Message + Sync + Send,
    {
        /// Creates a new `MockPublisher` instance.
        fn new() -> Self {
            Self {
                publish: std::sync::Arc::new(|_, _| {
                    let mut future = futures::future::ready(Ok(()));
                    future.set_output(Ok(()));
                    Box::new(future)
                }),
            }
        }

        /// Expect a call to `publish` method of `Publisher` trait
        /// with the given `destination` and `message`.
        fn expect_publish(
            &mut self,
        ) -> &mut mockall::Expectation<
            '_,
            Box<dyn futures::Future<Output = Result<(), Error>> + Send + Sync>,
        > {
            let expectation = mockall::Expectation::new();
            self.publish = std::sync::Arc::new(move |destination, message| {
                expectation.call((destination, message))
            });
            expectation
        }
    }

    #[async_trait]
    impl Extractor for TestMessage {
        fn get(&self, _key: &str) -> Option<&str> {
            None
        }

        fn keys(&self) -> Vec<&str> {
            Vec::default()
        }
    }

    impl Message for TestMessage {}

    #[rstest]
    async fn publish_many_messages() {
        let destination = Destination::Queue("test_queue".to_string());
        let mut publisher = MockPublisher::<TestMessage>::new();

        publisher
            .expect_publish()
            .with(eq(destination.clone()), eq(TestMessage::Msg1))
            .once()
            .returning(|_, _| async { Ok(()) }.boxed());

        publisher
            .expect_publish()
            .with(eq(destination.clone()), eq(TestMessage::Msg2))
            .once()
            .returning(|_, _| async { Ok(()) }.boxed());

        publisher
            .expect_publish()
            .with(eq(destination.clone()), eq(TestMessage::Msg3))
            .once()
            .returning(|_, _| async { Ok(()) }.boxed());

        let result = MockPublisher::<TestMessage>
            ::publish_many(&publisher, destination, &[TestMessage::Msg1, TestMessage::Msg2, TestMessage::Msg3])
            .await;
        assert!(result.is_ok(), "{}", result.err().unwrap());
    }
}