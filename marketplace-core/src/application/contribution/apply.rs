use std::sync::Arc;

use async_trait::async_trait;
use futures::{stream::FuturesUnordered, StreamExt};
use marketplace_domain::{Error as DomainError, *};

// Usecase must be `Send` and `Sync` as it is managed in a rocket State<T> that requires T to be
// `Send` and `Sync`
#[async_trait]
pub trait Usecase: Send + Sync {
	async fn apply_to_contribution(
		&self,
		contribution_id: &ContributionId,
		contributor_id: &ContributorId,
	) -> Result<(), DomainError>;
}

pub struct ApplyToContribution {
	contribution_repository: Arc<dyn AggregateRootRepository<Contribution>>,
	event_store: Arc<dyn EventStore<Contribution>>,
	application_projector: Arc<ApplicationProjector>,
	uuid_generator: Arc<dyn UuidGenerator>,
}

impl ApplyToContribution {
	pub fn new(
		contribution_repository: Arc<dyn AggregateRootRepository<Contribution>>,
		event_store: Arc<dyn EventStore<Contribution>>,
		application_projector: Arc<ApplicationProjector>,
		uuid_generator: Arc<dyn UuidGenerator>,
	) -> Self {
		Self {
			contribution_repository,
			event_store,
			application_projector,
			uuid_generator,
		}
	}
}

impl ApplyToContribution {
	pub fn new_usecase_boxed(
		contribution_repository: Arc<dyn AggregateRootRepository<Contribution>>,
		event_store: Arc<dyn EventStore<Contribution>>,
		application_projector: Arc<ApplicationProjector>,
		uuid_generator: Arc<dyn UuidGenerator>,
	) -> Box<dyn Usecase> {
		Box::new(Self::new(
			contribution_repository,
			event_store,
			application_projector,
			uuid_generator,
		))
	}
}

#[async_trait]
impl Usecase for ApplyToContribution {
	async fn apply_to_contribution(
		&self,
		contribution_id: &ContributionId,
		contributor_id: &ContributorId,
	) -> Result<(), DomainError> {
		let mut contribution = self.contribution_repository.find_by_id(contribution_id)?;
		let events = contribution.apply(contributor_id)?;
		let storable_events: Vec<StorableEvent<Contribution>> = events
			.iter()
			.map(|event| StorableEvent {
				deduplication_id: self.uuid_generator.new_uuid().to_string(),
				event: event.to_owned(),
			})
			.collect();
		self.event_store.append(&contribution.id(), storable_events)?;
		// TODO: the usecase shouldn't know about the projectors, it should just push the events to
		// a bus
		for event in &events {
			self.application_projector.project(event).await;
		}

		Ok(())
	}
}
