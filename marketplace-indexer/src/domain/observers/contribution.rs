use super::*;
use std::sync::Arc;

pub struct ContributionObserver<P: Projection<A = Contribution>> {
	projector: Arc<dyn Projector<P>>,
}

impl<P: Projection<A = Contribution>> ContributionObserver<P> {
	pub fn new(projector: Arc<dyn Projector<P>>) -> Self {
		Self { projector }
	}
}

#[async_trait]
impl<P: Projection<A = Contribution>> Observer for ContributionObserver<P> {
	async fn on_new_event(&self, event: &ObservedEvent, _block_number: u64) {
		if let Event::Contribution(event) = &event.event {
			self.projector.project(event).await
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
		impl Projector<ContributionProjection> for ContributionProjector {
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
