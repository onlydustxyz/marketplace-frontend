use std::{marker::PhantomData, sync::Arc};

use async_trait::async_trait;
use command::repository::Repository;

use crate::*;

pub struct CommandPublisher<P: Publisher<M>, M: Message + Send + Sync + IntoCommandEvent> {
	publisher: P,
	command_repository: Arc<dyn Repository>,
	expected_processing_count_per_event: i32,
	phantom: PhantomData<M>,
}

impl<P: Publisher<M>, M: Message + Send + Sync + IntoCommandEvent> CommandPublisher<P, M> {
	fn upsert_command(&self, command_event: CommandEvent) -> Result<(), PublisherError> {
		let mut command = self
			.command_repository
			.find_by_id_or_default(&command_event.command_id)
			.map_err(|e| PublisherError::Send(e))?;

		command.processing_count += self.expected_processing_count_per_event;
		command.metadata.add_aggregate(command_event.aggregate);

		self.command_repository.upsert(command).map_err(|e| PublisherError::Send(e))?;
		Ok(())
	}

	fn cancel_command(&self, command_event: CommandEvent) {
		if let Err(error) = self.command_repository.decrease_processing_count(
			&command_event.command_id,
			self.expected_processing_count_per_event,
		) {
			olog::error!(
				error = error.to_string(),
				command_id = command_event.command_id.to_string(),
				"Failed to reset command processing count after event publishing error"
			)
		}
	}
}

#[async_trait]
impl<P: Publisher<M>, M: Message + Send + Sync + IntoCommandEvent> Publisher<M>
	for CommandPublisher<P, M>
{
	async fn publish(&self, destination: Destination, message: &M) -> Result<(), PublisherError> {
		self.upsert_command(message.into())?;
		match self.publisher.publish(destination, message).await {
			Ok(_) => Ok(()),
			Err(error) => {
				self.cancel_command(message.into());
				Err(error)
			},
		}
	}
}

pub trait CommandPublisherDecorator<P: Publisher<M>, M: Message + Send + Sync + IntoCommandEvent> {
	fn with_command(
		self,
		command_repository: Arc<dyn Repository>,
		expected_processing_count_per_event: i32,
	) -> CommandPublisher<P, M>;
}

impl<P: Publisher<M>, M: Message + Send + Sync + IntoCommandEvent> CommandPublisherDecorator<P, M>
	for P
{
	fn with_command(
		self,
		command_repository: Arc<dyn Repository>,
		expected_processing_count_per_event: i32,
	) -> CommandPublisher<P, M> {
		CommandPublisher {
			publisher: self,
			command_repository,
			expected_processing_count_per_event,
			phantom: Default::default(),
		}
	}
}
