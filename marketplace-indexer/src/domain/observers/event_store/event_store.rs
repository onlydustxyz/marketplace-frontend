use crate::domain::*;
use async_trait::async_trait;
use log::error;
use marketplace_domain::{EventStore, *};
use std::sync::Arc;

pub struct EventStoreObserver {
	contribution_event_store: Arc<dyn EventStore<Contribution>>,
	project_event_store: Arc<dyn EventStore<ProjectAggregate>>,
}

impl EventStoreObserver {
	pub fn new(
		contribution_event_store: Arc<dyn EventStore<Contribution>>,
		project_event_store: Arc<dyn EventStore<ProjectAggregate>>,
	) -> Self {
		Self {
			contribution_event_store,
			project_event_store,
		}
	}
}

#[async_trait]
impl Observer for EventStoreObserver {
	async fn on_new_event(&self, event: &ObservedEvent, _block_number: u64) {
		match &event.event {
			Event::Contribution(domain_event) => {
				let id = <Contribution as Identifiable>::id(domain_event);
				store_event(
					self.contribution_event_store.clone(),
					id,
					domain_event.clone(),
					event.deduplication_id.clone(),
				);
			},
			Event::Project(domain_event) => {
				let id = <ProjectAggregate as Identifiable>::id(domain_event);
				store_event(
					self.project_event_store.clone(),
					id,
					domain_event.clone(),
					event.deduplication_id.clone(),
				);
			},
		}
	}
}

fn store_event<A: Aggregate>(
	event_store: Arc<dyn EventStore<A>>,
	id: &A::Id,
	event: A::Event,
	deduplication_id: String,
) {
	if let Err(error) = event_store.append(
		id,
		vec![StorableEvent {
			event: event.clone(),
			deduplication_id,
		}],
	) {
		error!("Failed to append {event} to the store: {error}",);
	}
}

trait Identifiable: Aggregate {
	fn id(event: &Self::Event) -> &Self::Id;
}

impl Identifiable for Contribution {
	fn id(event: &Self::Event) -> &Self::Id {
		match event {
			ContributionEvent::Created {
				id,
				project_id: _,
				issue_number: _,
				gate: _,
			}
			| ContributionEvent::Assigned {
				id,
				contributor_id: _,
			}
			| ContributionEvent::Applied {
				id,
				contributor_id: _,
			}
			| ContributionEvent::Unassigned { id }
			| ContributionEvent::Validated { id } => id,
		}
	}
}

impl Identifiable for ProjectAggregate {
	fn id(event: &Self::Event) -> &Self::Id {
		match event {
			ProjectEvent::MemberAdded {
				project_id,
				contributor_account: _,
			}
			| ProjectEvent::MemberRemoved {
				project_id,
				contributor_account: _,
			}
			| ProjectEvent::LeadContributorAdded {
				project_id,
				contributor_account: _,
			}
			| ProjectEvent::LeadContributorRemoved {
				project_id,
				contributor_account: _,
			} => project_id,
		}
	}
}
