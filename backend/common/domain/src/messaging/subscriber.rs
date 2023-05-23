/// This module provides a trait `Subscriber` that can be used to consume messages asynchronously.
/// A specific implementation should be provided for `M`, a type that implements the `Message` trait.
use std::future::Future;

use async_trait::async_trait;
use thiserror::Error;

use super::Message;

/// An enum that represents the possible errors that can occur while consuming messages.
#[derive(Debug, Error)]
pub enum Error {
    #[error("Failed while receiving data from queue")]
    Receive(#[source] anyhow::Error),

    #[error("Failed while acknowledging message to publisher")]
    Ack(#[source] anyhow::Error),

    #[error("Failed while sending NACK to publisher")]
    Nack(#[source] anyhow::Error),

    #[error(transparent)]
    Processing(#[from] anyhow::Error),

    #[error("Failed while deserializing message")]
    Deserialize(#[from] serde_json::Error),
}

/// An enum that represents the possible errors that can occur in the callback function of a `Subscriber`.
/// - Returning a `Discard` error will discard the current message and process the next one. It won't be requeued.
/// - Returning an `Fatal` error will stop the consuming of messages. The current message must be automatically requeued by the message broker.
#[derive(Debug, Error)]
pub enum CallbackError {
    #[error("Ignoring message")]
    Discard(#[source] anyhow::Error),

    #[error("Fatal error while processing the message")]
    Fatal(#[source] anyhow::Error),
}

/// A trait that defines a method for consuming messages asynchronously.
///
/// # Example
///
/// ```
/// use async_trait::async_trait;
/// use std::future::Future;
///
/// use myslib::{Message, Subscriber, CallbackError, Error};
///
/// struct MyMessage {}
///
/// impl Message for MyMessage {
///   // implementation
/// }
///
/// pub struct MySubscriber {}
///
/// #[async_trait]
/// impl Subscriber<MyMessage> for MySubscriber {
///   async fn subscribe<C, F>(&self, callback: C) -> Result<(), Error>
///   where
///     C: Fn(MyMessage) -> F + Send + Sync,
///     F: Future<Output = Result<(), CallbackError>> + Send,
///   {
///     // implementation
///   }
/// }
/// ```
///
#[async_trait]
pub trait Subscriber<M: Message> {
    /// Subscribe to a topic and callback with a function for consuming messages asynchronously.
    async fn subscribe<C, F>(&self, callback: C) -> Result<(), Error>
    where
        C: Fn(M) -> F + Send + Sync,
        F: Future<Output = Result<(), CallbackError>> + Send;
}