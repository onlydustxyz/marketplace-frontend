use crate::domain::*;
use async_trait::async_trait;
use chrono::NaiveDateTime;
use log::error;
use marketplace_domain::{EventStore, *};
use serde_json::Value;
use std::sync::Arc;

pub struct EventStoreObserver {
	contribution_event_store: Arc<dyn EventStore<Contribution>>,
	project_event_store: Arc<dyn EventStore<Project>>,
	contributor_event_store: Arc<dyn EventStore<Contributor>>,
}

impl EventStoreObserver {
	pub fn new(
		contribution_event_store: Arc<dyn EventStore<Contribution>>,
		project_event_store: Arc<dyn EventStore<Project>>,
		contributor_event_store: Arc<dyn EventStore<Contributor>>,
	) -> Self {
		Self {
			contribution_event_store,
			project_event_store,
			contributor_event_store,
		}
	}
}

#[async_trait]
impl Observer for EventStoreObserver {
	async fn on_new_event(&self, observed_event: &ObservedEvent, _block_number: u64) {
		match &observed_event.event {
			Event::Contribution(contribution_event) => {
				let id = <Contribution as Identifiable<ContributionEvent>>::id(contribution_event);
				store_event(
					self.contribution_event_store.clone(),
					&id,
					contribution_event.clone(),
					observed_event.deduplication_id.clone(),
					observed_event.timestamp,
					observed_event.metadata.clone(),
				);
			},
			Event::Project(project_event) => {
				let id = <Project as Identifiable<ProjectEvent>>::id(project_event);
				store_event(
					self.project_event_store.clone(),
					&id,
					project_event.clone(),
					observed_event.deduplication_id.clone(),
					observed_event.timestamp,
					observed_event.metadata.clone(),
				);
			},
			Event::Contributor(contributor_event) => {
				let id = <Contributor as Identifiable<ContributorEvent>>::id(contributor_event);
				store_event(
					self.contributor_event_store.clone(),
					&id,
					contributor_event.clone(),
					observed_event.deduplication_id.clone(),
					observed_event.timestamp,
					observed_event.metadata.clone(),
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
	timestamp: NaiveDateTime,
	metadata: Value,
) {
	if let Err(error) = event_store.append(
		id,
		vec![StorableEvent {
			event: event.clone(),
			deduplication_id,
			timestamp,
			metadata,
			origin: EventOrigin::Starknet,
		}],
	) {
		error!("Failed to append {event} to the store: {error}",);
	}
}

trait Identifiable<E>: Aggregate {
	fn id(event: &E) -> Self::Id;
}

impl Identifiable<ContributionEvent> for Contribution {
	fn id(event: &ContributionEvent) -> Self::Id {
		match event {
			ContributionEvent::Deployed { contract_address } => contract_address.clone().into(),
			ContributionEvent::Created { id, .. }
			| ContributionEvent::Assigned { id, .. }
			| ContributionEvent::Claimed { id, .. }
			| ContributionEvent::Applied { id, .. }
			| ContributionEvent::ApplicationRefused { id, .. }
			| ContributionEvent::Unassigned { id }
			| ContributionEvent::Validated { id }
			| ContributionEvent::Deleted { id }
			| ContributionEvent::GateChanged { id, .. } => id.clone(),
		}
	}
}

impl Identifiable<ProjectEvent> for Project {
	fn id(event: &ProjectEvent) -> Self::Id {
		match event {
			ProjectEvent::MemberAdded { project_id, .. }
			| ProjectEvent::MemberRemoved { project_id, .. }
			| ProjectEvent::LeadContributorAdded { project_id, .. }
			| ProjectEvent::LeadContributorRemoved { project_id, .. } => *project_id,
		}
	}
}

impl Identifiable<ContributorEvent> for Contributor {
	fn id(event: &ContributorEvent) -> Self::Id {
		match event {
			ContributorEvent::GithubAccountAssociated {
				contributor_account,
				github_identifier: _,
				contributor_id: _,
			} => contributor_account.clone(),
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
	fn project_event_store() -> MockEventStore<Project> {
		MockEventStore::<Project>::new()
	}

	#[fixture]
	fn contributor_event_store() -> MockEventStore<Contributor> {
		MockEventStore::<Contributor>::new()
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

	#[fixture]
	fn contributor_account_address() -> ContributorAccountAddress {
		Default::default()
	}

	#[fixture]
	fn contributor_event(
		contributor_account_address: ContributorAccountAddress,
	) -> ContributorEvent {
		ContributorEvent::GithubAccountAssociated {
			contributor_account: contributor_account_address,
			github_identifier: 666u64,
			contributor_id: Default::default(),
		}
	}

	#[fixture]
	fn event_from_contributor(contributor_event: ContributorEvent) -> ObservedEvent {
		ObservedEvent {
			event: Event::Contributor(contributor_event),
			..Default::default()
		}
	}

	#[rstest]
	async fn on_new_contribution_event(
		mut contribution_event_store: MockEventStore<Contribution>,
		project_event_store: MockEventStore<Project>,
		contributor_event_store: MockEventStore<Contributor>,
		contribution_id: ContributionId,
		event_from_contribution: ObservedEvent,
		contribution_event: ContributionEvent,
	) {
		let cloned_event = event_from_contribution.clone();
		contribution_event_store
			.expect_append()
			.once()
			.with(
				eq(contribution_id),
				eq(vec![StorableEvent {
					event: contribution_event.clone(),
					deduplication_id: cloned_event.deduplication_id.clone(),
					timestamp: cloned_event.timestamp,
					metadata: Default::default(),
					origin: EventOrigin::Starknet,
				}]),
			)
			.returning(|_, _| Ok(()));

		let observer = EventStoreObserver::new(
			Arc::new(contribution_event_store),
			Arc::new(project_event_store),
			Arc::new(contributor_event_store),
		);

		observer.on_new_event(&event_from_contribution, 0).await;
	}

	#[rstest]
	async fn on_new_project_event(
		contribution_event_store: MockEventStore<Contribution>,
		mut project_event_store: MockEventStore<Project>,
		contributor_event_store: MockEventStore<Contributor>,
		project_id: ProjectId,
		event_from_project: ObservedEvent,
		project_event: ProjectEvent,
	) {
		let cloned_event = event_from_project.clone();
		project_event_store
			.expect_append()
			.once()
			.with(
				eq(project_id),
				eq(vec![StorableEvent {
					event: project_event.clone(),
					deduplication_id: cloned_event.deduplication_id.clone(),
					timestamp: cloned_event.timestamp,
					origin: EventOrigin::Starknet,
					metadata: Default::default(),
				}]),
			)
			.returning(|_, _| Ok(()));

		let observer = EventStoreObserver::new(
			Arc::new(contribution_event_store),
			Arc::new(project_event_store),
			Arc::new(contributor_event_store),
		);

		observer.on_new_event(&event_from_project, 0).await;
	}

	#[rstest]
	async fn on_new_contributor_event(
		contribution_event_store: MockEventStore<Contribution>,
		project_event_store: MockEventStore<Project>,
		mut contributor_event_store: MockEventStore<Contributor>,
		contributor_account_address: ContributorAccountAddress,
		event_from_contributor: ObservedEvent,
		contributor_event: ContributorEvent,
	) {
		let cloned_event = event_from_contributor.clone();
		contributor_event_store
			.expect_append()
			.once()
			.with(
				eq(contributor_account_address),
				eq(vec![StorableEvent {
					event: contributor_event.clone(),
					deduplication_id: cloned_event.deduplication_id.clone(),
					timestamp: cloned_event.timestamp,
					origin: EventOrigin::Starknet,
					metadata: Default::default(),
				}]),
			)
			.returning(|_, _| Ok(()));

		let observer = EventStoreObserver::new(
			Arc::new(contribution_event_store),
			Arc::new(project_event_store),
			Arc::new(contributor_event_store),
		);

		observer.on_new_event(&event_from_contributor, 0).await;
	}
}
