use super::*;
use log::error;
use std::sync::Arc;

pub struct ApplicationObserver {
	contribution_service: Arc<dyn ContributionService>,
}

impl ApplicationObserver {
	pub fn new(contribution_service: Arc<dyn ContributionService>) -> Self {
		Self {
			contribution_service,
		}
	}
}

impl Observer for ApplicationObserver {
	fn on_new_event(&self, event: &ObservedEvent, _block_number: u64) {
		match &event.event {
			Event::Contribution(event) => {
				if let ContributionEvent::Assigned { id, contributor_id } = event {
					let result = self.contribution_service.on_assigned(id, contributor_id);
					if let Err(error) = result {
						error!(
							"Unable to update applications with {event}: {}",
							error.to_string()
						);
					}
				}
			},
		}
	}
}

#[cfg(test)]
mod test {
	use super::*;
	use mockall::predicate::*;
	use rstest::*;

	#[fixture]
	fn contribution_id() -> ContributionId {
		"0x22".parse().unwrap()
	}

	#[fixture]
	fn contributor_id() -> ContributorId {
		"0x22".parse().unwrap()
	}

	#[fixture]
	fn contribution_event(
		contribution_id: ContributionId,
		contributor_id: ContributorId,
	) -> ContributionEvent {
		ContributionEvent::Assigned {
			id: contribution_id,
			contributor_id,
		}
	}

	#[fixture]
	fn event(contribution_event: ContributionEvent) -> ObservedEvent {
		ObservedEvent {
			event: Event::Contribution(contribution_event),
			deduplication_id: String::default(),
		}
	}

	#[fixture]
	fn contribution_service() -> MockContributionService {
		MockContributionService::new()
	}

	#[rstest]
	fn on_contribution_assigned_event(
		mut contribution_service: MockContributionService,
		event: ObservedEvent,
		contribution_id: ContributionId,
		contributor_id: ContributorId,
	) {
		contribution_service
			.expect_on_assigned()
			.with(eq(contribution_id), eq(contributor_id))
			.returning(|_, _| Ok(()));

		let observer = ApplicationObserver::new(Arc::new(contribution_service));
		observer.on_new_event(&event, 42)
	}
}
