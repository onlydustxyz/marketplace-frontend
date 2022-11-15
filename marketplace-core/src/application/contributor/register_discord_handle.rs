use anyhow::Result;
use async_trait::async_trait;
use chrono::Utc;
use event_store::{bus::QUEUE_NAME as EVENT_STORE_QUEUE, Event, EventOrigin};
use marketplace_domain::{
	Contributor, ContributorDiscordHandle, Destination, Publisher, UuidGenerator,
};
use std::sync::Arc;
use uuid::Uuid;

// Usecase must be `Send` and `Sync` as it is managed in a rocket State<T> that requires T to be
// `Send` and `Sync`
#[async_trait]
pub trait Usecase: Send + Sync {
	async fn register_discord_handle(
		&self,
		user_id: Uuid,
		discord_handle: ContributorDiscordHandle,
	) -> Result<()>;
}

pub struct RegisterDiscordHandle {
	event_publisher: Arc<dyn Publisher<Event>>,
	uuid_generator: Arc<dyn UuidGenerator>,
}

impl RegisterDiscordHandle {
	pub fn new(
		event_publisher: Arc<dyn Publisher<Event>>,
		uuid_generator: Arc<dyn UuidGenerator>,
	) -> Self {
		Self {
			event_publisher,
			uuid_generator,
		}
	}

	pub fn new_usecase_boxed(
		event_publisher: Arc<dyn Publisher<Event>>,
		uuid_generator: Arc<dyn UuidGenerator>,
	) -> Box<dyn Usecase> {
		Box::new(Self::new(event_publisher, uuid_generator))
	}
}

#[async_trait]
impl Usecase for RegisterDiscordHandle {
	async fn register_discord_handle(
		&self,
		user_id: Uuid,
		discord_handle: ContributorDiscordHandle,
	) -> Result<()> {
		let events = Contributor::register_discord_handle(user_id, discord_handle)?;
		let storable_events: Vec<_> = events
			.into_iter()
			.map(|event| Event {
				deduplication_id: self.uuid_generator.new_uuid().to_string(),
				event: event.into(),
				timestamp: Utc::now().naive_utc(),
				origin: EventOrigin::BACKEND,
				metadata: Default::default(),
			})
			.collect();

		self.event_publisher
			.publish_many(
				Destination::Queue(EVENT_STORE_QUEUE.into()),
				&storable_events,
			)
			.await?;

		Ok(())
	}
}
