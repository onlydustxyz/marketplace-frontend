use super::*;
use std::sync::Arc;

pub struct ContributionObserver {
	contribution_projection: Arc<dyn EventProjection<ContributionAggregate>>,
}

impl ContributionObserver {
	pub fn new(contribution_projection: Arc<dyn EventProjection<ContributionAggregate>>) -> Self {
		Self {
			contribution_projection,
		}
	}
}

impl Observer for ContributionObserver {
	fn on_new_event(&self, event: &Event, _block_number: u64) {
		match event {
			Event::Contribution(event) => self.contribution_projection.project(event),
		}
	}
}

#[cfg(test)]
mod test {
	use super::*;
	use mockall::{mock, predicate::*};
	use rstest::*;

	mock! {
		pub ContributionProjection {}

		impl EventProjection<ContributionAggregate> for ContributionProjection {
			fn project(&self, event: &ContributionEvent);
		}
	}

	#[fixture]
	fn contribution_event() -> ContributionEvent {
		ContributionEvent::Validated {
			id: Default::default(),
		}
	}

	#[fixture]
	fn event(contribution_event: ContributionEvent) -> Event {
		Event::Contribution(contribution_event)
	}

	#[fixture]
	fn contribution_projection() -> MockContributionProjection {
		MockContributionProjection::new()
	}

	#[rstest]
	fn on_contribution_created_event(
		mut contribution_projection: MockContributionProjection,
		contribution_event: ContributionEvent,
		event: Event,
	) {
		contribution_projection
			.expect_project()
			.with(eq(contribution_event))
			.return_const(());

		let observer = ContributionObserver::new(Arc::new(contribution_projection));
		observer.on_new_event(&event, 0)
	}
}
