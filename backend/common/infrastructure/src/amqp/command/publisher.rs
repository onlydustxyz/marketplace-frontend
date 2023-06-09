use std::sync::Arc;

use async_trait::async_trait;
use domain::{
	CommandAggregateId, CommandId, CommandRepository, Destination, Event, Publisher, PublisherError,
};

use crate::amqp::UniqueMessage;

pub struct CommandPublisher<P>
where
	P: Publisher<UniqueMessage<Event>>,
{
	publisher: P,
	command_repository: Arc<dyn CommandRepository>,
	expected_processing_count_per_event: i32,
}

impl<P> CommandPublisher<P>
where
	P: Publisher<UniqueMessage<Event>>,
{
	fn upsert_command(
		&self,
		command_id: &CommandId,
		aggregate_id: CommandAggregateId,
	) -> Result<(), PublisherError> {
		let mut command = self
			.command_repository
			.find_by_id_or_default(command_id)
			.map_err(PublisherError::Send)?;

		command.processing_count += self.expected_processing_count_per_event;
		command.metadata.add_aggregate(aggregate_id);

		self.command_repository.upsert(command).map_err(PublisherError::Send)?;
		Ok(())
	}

	fn cancel_command(&self, command_id: &CommandId) {
		if let Err(error) = self
			.command_repository
			.decrease_processing_count(command_id, self.expected_processing_count_per_event)
		{
			olog::error!(
				error = error.to_string(),
				command_id = command_id.to_string(),
				"Failed to reset command processing count after event publishing error"
			)
		}
	}
}

#[async_trait]
impl<P> Publisher<UniqueMessage<Event>> for CommandPublisher<P>
where
	P: Publisher<UniqueMessage<Event>>,
{
	async fn publish(
		&self,
		destination: Destination,
		message: &UniqueMessage<Event>,
	) -> Result<(), PublisherError> {
		match message.command_id() {
			Some(command_id) => {
				self.upsert_command(command_id, message.payload().clone().into())?;
				self.publisher.publish(destination, message).await.map_err(|error| {
					self.cancel_command(command_id);
					error
				})
			},
			None => self.publisher.publish(destination, message).await,
		}
	}
}

pub trait CommandPublisherDecorator<P>
where
	P: Publisher<UniqueMessage<Event>>,
{
	fn into_command_publisher(
		self,
		command_repository: Arc<dyn CommandRepository>,
		expected_processing_count_per_event: i32,
	) -> CommandPublisher<P>;
}

impl<P> CommandPublisherDecorator<P> for P
where
	P: Publisher<UniqueMessage<Event>>,
{
	fn into_command_publisher(
		self,
		command_repository: Arc<dyn CommandRepository>,
		expected_processing_count_per_event: i32,
	) -> CommandPublisher<P> {
		CommandPublisher {
			publisher: self,
			command_repository,
			expected_processing_count_per_event,
		}
	}
}
