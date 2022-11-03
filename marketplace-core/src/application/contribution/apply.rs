use async_trait::async_trait;
use chrono::Utc;
use marketplace_domain::{Error as DomainError, *};
use marketplace_event_store::{
	bus::QUEUE_NAME as EVENT_STORE_QUEUE, Event as StorableEvent, EventOrigin,
};
use std::sync::Arc;

// Usecase must be `Send` and `Sync` as it is managed in a rocket State<T> that requires T to be
// `Send` and `Sync`
#[async_trait]
pub trait Usecase: Send + Sync {
	async fn apply_to_contribution(
		&self,
		contribution_id: &ContributionId,
		contributor_account_address: &ContributorAccountAddress,
	) -> Result<(), DomainError>;
}

pub struct ApplyToContribution {
	contribution_repository: AggregateRootRepository<Contribution>,
	event_publisher: Arc<dyn Publisher<StorableEvent>>,
	uuid_generator: Arc<dyn UuidGenerator>,
}

impl ApplyToContribution {
	pub fn new(
		contribution_repository: AggregateRootRepository<Contribution>,
		event_publisher: Arc<dyn Publisher<StorableEvent>>,
		uuid_generator: Arc<dyn UuidGenerator>,
	) -> Self {
		Self {
			contribution_repository,
			event_publisher,
			uuid_generator,
		}
	}
}

impl ApplyToContribution {
	pub fn new_usecase_boxed(
		contribution_repository: AggregateRootRepository<Contribution>,
		event_publisher: Arc<dyn Publisher<StorableEvent>>,
		uuid_generator: Arc<dyn UuidGenerator>,
	) -> Box<dyn Usecase> {
		Box::new(Self::new(
			contribution_repository,
			event_publisher,
			uuid_generator,
		))
	}
}

#[async_trait]
impl Usecase for ApplyToContribution {
	async fn apply_to_contribution(
		&self,
		contribution_id: &ContributionId,
		contributor_account_address: &ContributorAccountAddress,
	) -> Result<(), DomainError> {
		let contribution = self.contribution_repository.find_by_id(contribution_id)?;
		let events = contribution.apply(contributor_account_address)?;
		let storable_events: Vec<StorableEvent> = events
			.iter()
			.map(|event| StorableEvent {
				deduplication_id: self.uuid_generator.new_uuid().to_string(),
				event: event.clone().into(),
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
