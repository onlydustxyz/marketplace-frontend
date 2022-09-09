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
			| ContributionEvent::Claimed {
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

#[cfg(test)]
mod test {
	use super::*;
	use mockall::predicate::*;
	use rstest::*;
	use std::sync::Arc;

	#[fixture]
	fn contribution_id() -> ContributionId {
		Default::default()
	}

	#[fixture]
	fn contribution_event_store() -> MockEventStore<Contribution> {
		MockEventStore::<Contribution>::new()
	}

	#[fixture]
	fn project_event_store() -> MockEventStore<ProjectAggregate> {
		MockEventStore::<ProjectAggregate>::new()
	}

	#[fixture]
	fn contribution_event(contribution_id: ContributionId) -> ContributionEvent {
		ContributionEvent::Validated {
			id: contribution_id,
		}
	}

	#[fixture]
	fn event_from_contribution(contribution_event: ContributionEvent) -> ObservedEvent {
		ObservedEvent {
			event: Event::Contribution(contribution_event),
			..Default::default()
		}
	}

	#[fixture]
	fn project_id() -> ProjectId {
		Default::default()
	}

	#[fixture]
	fn project_event(project_id: ProjectId) -> ProjectEvent {
		ProjectEvent::MemberAdded {
			project_id,
			contributor_account: Default::default(),
		}
	}

	#[fixture]
	fn event_from_project(project_event: ProjectEvent) -> ObservedEvent {
		ObservedEvent {
			event: Event::Project(project_event),
			..Default::default()
		}
	}

	#[rstest]
	async fn on_new_contribution_event(
		mut contribution_event_store: MockEventStore<Contribution>,
		project_event_store: MockEventStore<ProjectAggregate>,
		contribution_id: ContributionId,
		event_from_contribution: ObservedEvent,
		contribution_event: ContributionEvent,
	) {
		let cloned_event = event_from_contribution.clone();
		contribution_event_store
			.expect_append()
			.times(1)
			.with(
				eq(contribution_id),
				eq(vec![StorableEvent {
					event: contribution_event.to_owned(),
					deduplication_id: cloned_event.deduplication_id.to_owned(),
				}]),
			)
			.returning(|_, _| Ok(()));

		let observer = EventStoreObserver::new(
			Arc::new(contribution_event_store),
			Arc::new(project_event_store),
		);

		observer.on_new_event(&event_from_contribution, 0).await;
	}

	#[rstest]
	async fn on_new_project_event(
		contribution_event_store: MockEventStore<Contribution>,
		mut project_event_store: MockEventStore<ProjectAggregate>,
		project_id: ProjectId,
		event_from_project: ObservedEvent,
		project_event: ProjectEvent,
	) {
		let cloned_event = event_from_project.clone();
		project_event_store
			.expect_append()
			.times(1)
			.with(
				eq(project_id),
				eq(vec![StorableEvent {
					event: project_event.to_owned(),
					deduplication_id: cloned_event.deduplication_id.to_owned(),
				}]),
			)
			.returning(|_, _| Ok(()));

		let observer = EventStoreObserver::new(
			Arc::new(contribution_event_store),
			Arc::new(project_event_store),
		);

		observer.on_new_event(&event_from_project, 0).await;
	}
}
