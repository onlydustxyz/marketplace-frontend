use log::{error, info};

use super::*;
use marketplace_domain::EventStore;

impl<ES: EventStore<Contribution>> Observer for ES {
	fn on_new_event(&self, event: &Event, _block_number: u64) {
		info!("EventStore observer received event {}", event);

		let Event::Contribution(event) = event;
		let id = match event {
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

		if let Err(error) = self.append(id, vec![event.to_owned()]) {
			error!(
				"Failed to append {event} to the store: {}",
				error.to_string()
			);
		} else {
			info!("Event successfully appended in event store");
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
	fn event(contribution_event: ContributionEvent) -> Event {
		Event::Contribution(contribution_event)
	}

	#[rstest]
	fn on_new_event(
		mut event_store: EventStore,
		contribution_id: ContributionId,
		event: Event,
		contribution_event: ContributionEvent,
	) {
		event_store
			.expect_append()
			.times(1)
			.with(eq(contribution_id), eq(vec![contribution_event]))
			.returning(|_, _| Ok(()));

		event_store.on_new_event(&event, 0);
	}
}
