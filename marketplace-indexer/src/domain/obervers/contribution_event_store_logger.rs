use log::error;

use super::*;
use marketplace_domain::EventStore;

impl<ES: EventStore<Contribution>> Observer for ES {
	fn on_new_event(&self, event: &ObservedEvent, _block_number: u64) {
		let Event::Contribution(domain_event) = &event.event;
		let id = match domain_event {
			ContributionEvent::Created {
				id,
				project_id: _,
				issue_number: _,
				gate: _,
			} => id,
			ContributionEvent::Assigned {
				id,
				contributor_id: _,
			} => id,
			ContributionEvent::Unassigned { id } => id,
			ContributionEvent::Validated { id } => id,
		};

		if let Err(error) = self.append(
			id,
			vec![StorableEvent {
				event: domain_event.to_owned(),
				deduplication_id: event.deduplication_id.to_owned(),
			}],
		) {
			error!(
				"Failed to append {event} to the store: {}",
				error.to_string()
			);
		}
	}
}

#[cfg(test)]
mod test {
	use super::*;
	use mockall::predicate::*;
	use rstest::*;

	type EventStore = MockEventStore<Contribution>;

	#[fixture]
	fn contribution_id() -> ContributionId {
		Default::default()
	}

	#[fixture]
	fn event_store() -> EventStore {
		MockEventStore::<Contribution>::new()
	}

	#[fixture]
	fn contribution_event(contribution_id: ContributionId) -> ContributionEvent {
		ContributionEvent::Validated {
			id: contribution_id,
		}
	}

	#[fixture]
	fn event(contribution_event: ContributionEvent) -> ObservedEvent {
		ObservedEvent {
			event: Event::Contribution(contribution_event),
			..Default::default()
		}
	}

	#[rstest]
	fn on_new_event(
		mut event_store: EventStore,
		contribution_id: ContributionId,
		event: ObservedEvent,
		contribution_event: ContributionEvent,
	) {
		let cloned_event = event.clone();
		event_store
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

		event_store.on_new_event(&event, 0);
	}
}
