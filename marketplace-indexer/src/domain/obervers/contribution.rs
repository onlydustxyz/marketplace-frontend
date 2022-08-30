use super::*;
use std::sync::Arc;

pub struct ContributionObserver {
	projector: Arc<dyn Projector<Contribution>>,
}

impl ContributionObserver {
	pub fn new(projector: Arc<dyn Projector<Contribution>>) -> Self {
		Self { projector }
	}
}

#[async_trait]
impl Observer for ContributionObserver {
	async fn on_new_event(&self, event: &ObservedEvent, _block_number: u64) {
		match &event.event {
			Event::Contribution(event) => self.projector.project(event).await,
		}
	}
}

#[cfg(test)]
mod test {
	use super::*;
	use async_trait::async_trait;
	use mockall::{mock, predicate::*};
	use rstest::*;

	mock! {
		pub ContributionProjector {}

		#[async_trait]
		impl Projector<Contribution> for ContributionProjector {
			async fn project(&self, event: &ContributionEvent);
		}
	}

	#[fixture]
	fn contribution_event() -> ContributionEvent {
		ContributionEvent::Validated {
			id: Default::default(),
		}
	}

	#[fixture]
	fn event(contribution_event: ContributionEvent) -> ObservedEvent {
		ObservedEvent {
			event: Event::Contribution(contribution_event),
			..Default::default()
		}
	}

	#[fixture]
	fn contribution_projector() -> MockContributionProjector {
		MockContributionProjector::new()
	}

	#[rstest]
	async fn on_contribution_created_event(
		mut contribution_projector: MockContributionProjector,
		contribution_event: ContributionEvent,
		event: ObservedEvent,
	) {
		contribution_projector
			.expect_project()
			.with(eq(contribution_event))
			.return_const(());

		let observer = ContributionObserver::new(Arc::new(contribution_projector));
		observer.on_new_event(&event, 0).await;
	}
}
