use async_trait::async_trait;
use chrono::Utc;
use marketplace_domain::{Error as DomainError, *};
use marketplace_event_store::{bus::QUEUE_NAME as EVENT_STORE_QUEUE, Event as StorableEvent};
use std::sync::Arc;

// Usecase must be `Send` and `Sync` as it is managed in a rocket State<T> that requires T to be
// `Send` and `Sync`
#[async_trait]
pub trait Usecase: Send + Sync {
	async fn register_discord_handle(
		&self,
		contributor_account_address: ContributorAccountAddress,
		discord_handle: ContributorDiscordHandle,
	) -> Result<(), DomainError>;
}

pub struct RegisterDiscordHandle {
	event_publisher: Arc<dyn Publisher<StorableEvent>>,
	contributor_projector: Arc<ContributorWithGithubDataProjector>,
	uuid_generator: Arc<dyn UuidGenerator>,
}

impl RegisterDiscordHandle {
	pub fn new(
		event_publisher: Arc<dyn Publisher<StorableEvent>>,
		contributor_projector: Arc<ContributorWithGithubDataProjector>,
		uuid_generator: Arc<dyn UuidGenerator>,
	) -> Self {
		Self {
			event_publisher,
			contributor_projector,
			uuid_generator,
		}
	}

	pub fn new_usecase_boxed(
		event_publisher: Arc<dyn Publisher<StorableEvent>>,
		contributor_projector: Arc<ContributorWithGithubDataProjector>,
		uuid_generator: Arc<dyn UuidGenerator>,
	) -> Box<dyn Usecase> {
		Box::new(Self::new(
			event_publisher,
			contributor_projector,
			uuid_generator,
		))
	}
}

#[async_trait]
impl Usecase for RegisterDiscordHandle {
	async fn register_discord_handle(
		&self,
		contributor_account_address: ContributorAccountAddress,
		discord_handle: ContributorDiscordHandle,
	) -> Result<(), DomainError> {
		let events = Contributor::register_discord_handle(
			contributor_account_address.clone(),
			discord_handle,
		)?;
		let storable_events: Vec<StorableEvent> = events
			.iter()
			.map(|event| {
				if let Event::Contributor(contribution_event) = event {
					StorableEvent {
						deduplication_id: self.uuid_generator.new_uuid().to_string(),
						event: contribution_event.clone().into(),
						timestamp: Utc::now().naive_utc(),
						origin: EventOrigin::BACKEND,
						metadata: Default::default(),
					}
				} else {
					panic!("Contribution event expected");
				}
			})
			.collect();

		self.event_publisher
			.publish_many(
				Destination::Queue(EVENT_STORE_QUEUE.into()),
				&storable_events,
			)
			.await?;
		// TODO: the usecase shouldn't know about the projectors, it should just push the events to
		// a bus
		for event in &events {
			self.contributor_projector.on_event(event).await;
		}
		Ok(())
	}
}
