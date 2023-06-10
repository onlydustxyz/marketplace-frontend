use std::{marker::PhantomData, sync::Arc};

use async_trait::async_trait;
use domain::{
	CommandId, CommandRepository, Event, Subscriber, SubscriberCallbackError, SubscriberError,
};
use futures::Future;

use crate::amqp::UniqueMessage;

pub struct CommandCallback<C, F>
where
	C: Fn(UniqueMessage<Event>) -> F + Send + Sync,
	F: Future<Output = Result<(), SubscriberCallbackError>> + Send,
{
	callback: C,
	command_repository: Arc<dyn CommandRepository>,
	phantom: PhantomData<fn() -> F>,
}

impl<C, F> CommandCallback<C, F>
where
	C: Fn(UniqueMessage<Event>) -> F + Send + Sync,
	F: Future<Output = Result<(), SubscriberCallbackError>> + Send,
{
	async fn call(&self, message: UniqueMessage<Event>) -> Result<(), SubscriberCallbackError> {
		match (self.callback)(message.clone()).await {
			Err(SubscriberCallbackError::Fatal(error)) =>
				Err(SubscriberCallbackError::Fatal(error)),
			result => {
				if let Some(command_id) = message.command_id() {
					self.decrease_processing_count(command_id);
				}
				result
			},
		}
	}

	fn decrease_processing_count(&self, command_id: &CommandId) {
		if let Err(error) = self.command_repository.decrease_processing_count(command_id, 1) {
			olog::error!(
				error = error.to_string(),
				command_id = command_id.to_string(),
				"Failed to decrease command processing count"
			)
		}
	}
}

pub struct CommandSubscriber<S>
where
	S: Subscriber<UniqueMessage<Event>>,
{
	subscriber: S,
	command_repository: Arc<dyn CommandRepository>,
}

#[async_trait]
impl<S> Subscriber<UniqueMessage<Event>> for CommandSubscriber<S>
where
	Self: Sync,
	S: Subscriber<UniqueMessage<Event>> + Send + Sync,
{
	async fn subscribe<C, F>(&self, callback: C) -> Result<(), SubscriberError>
	where
		C: Fn(UniqueMessage<Event>) -> F + Send + Sync,
		F: Future<Output = Result<(), SubscriberCallbackError>> + Send,
	{
		let command_callback = CommandCallback {
			callback,
			command_repository: self.command_repository.clone(),
			phantom: Default::default(),
		};
		self.subscriber.subscribe(|message| command_callback.call(message)).await
	}
}

pub trait CommandSubscriberDecorator<S>
where
	S: Subscriber<UniqueMessage<Event>>,
{
	fn into_command_subscriber(
		self,
		command_repository: Arc<dyn CommandRepository>,
	) -> CommandSubscriber<S>;
}

impl<S> CommandSubscriberDecorator<S> for S
where
	S: Subscriber<UniqueMessage<Event>>,
{
	fn into_command_subscriber(
		self,
		command_repository: Arc<dyn CommandRepository>,
	) -> CommandSubscriber<S> {
		CommandSubscriber {
			subscriber: self,
			command_repository,
		}
	}
}
