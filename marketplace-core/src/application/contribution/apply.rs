use async_trait::async_trait;
use chrono::Utc;
use marketplace_domain::{Error as DomainError, *};
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
	event_store: Arc<dyn EventStore<Contribution>>,
	application_projector: Arc<ApplicationProjector>,
	contributor_projector: Arc<ContributorWithGithubDataProjector>,
	uuid_generator: Arc<dyn UuidGenerator>,
}

impl ApplyToContribution {
	pub fn new(
		contribution_repository: AggregateRootRepository<Contribution>,
		event_store: Arc<dyn EventStore<Contribution>>,
		application_projector: Arc<ApplicationProjector>,
		contributor_projector: Arc<ContributorWithGithubDataProjector>,
		uuid_generator: Arc<dyn UuidGenerator>,
	) -> Self {
		Self {
			contribution_repository,
			event_store,
			application_projector,
			contributor_projector,
			uuid_generator,
		}
	}
}

impl ApplyToContribution {
	pub fn new_usecase_boxed(
		contribution_repository: AggregateRootRepository<Contribution>,
		event_store: Arc<dyn EventStore<Contribution>>,
		application_projector: Arc<ApplicationProjector>,
		contributor_projector: Arc<ContributorWithGithubDataProjector>,
		uuid_generator: Arc<dyn UuidGenerator>,
	) -> Box<dyn Usecase> {
		Box::new(Self::new(
			contribution_repository,
			event_store,
			application_projector,
			contributor_projector,
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
		let contribution_id = contribution_id.clone();
		let events = contribution.apply(contributor_account_address)?;
		let storable_events: Vec<StorableEvent<Contribution>> = events
			.iter()
			.map(|event| {
				if let Event::Contribution(contribution_event) = event {
					StorableEvent {
						deduplication_id: self.uuid_generator.new_uuid().to_string(),
						event: contribution_event.clone(),
						timestamp: Utc::now().naive_utc(),
						origin: EventOrigin::BACKEND,
						metadata: Default::default(),
					}
				} else {
					panic!("Contribution event expected");
				}
			})
			.collect();
		self.event_store.append(&contribution_id, storable_events)?;
		// TODO: the usecase shouldn't know about the projectors, it should just push the events to
		// a bus
		for event in &events {
			self.application_projector.on_event(event).await;
			self.contributor_projector.on_event(event).await;
		}

		Ok(())
	}
}
