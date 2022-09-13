use std::marker::PhantomData;

use super::*;

pub struct ContributionObserver<
	TProjector: EventHandler<TProjection>,
	TProjection: Projection<A = Contribution> + Send + Sync,
> {
	projector: TProjector,
	projection_type: PhantomData<TProjection>,
}

impl<ProjectorT: EventHandler<ProjectionT>, ProjectionT: Projection<A = Contribution> + Send + Sync>
	ContributionObserver<ProjectorT, ProjectionT>
{
	pub fn new(projector: ProjectorT) -> Self {
		Self {
			projector,
			projection_type: PhantomData,
		}
	}
}

#[async_trait]
impl<ProjectorT: EventHandler<ProjectionT>, ProjectionT: Projection<A = Contribution> + Send + Sync>
	Observer for ContributionObserver<ProjectorT, ProjectionT>
{
	async fn on_new_event(&self, observed_event: &ObservedEvent, _block_number: u64) {
		self.projector.handle(&observed_event.event).await
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
		impl EventHandler<ContributionProjection> for ContributionProjector {
			async fn handle(&self, event: &Event);
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
			.expect_handle()
			.with(eq(Event::Contribution(contribution_event)))
			.return_const(());

		let observer = ContributionObserver::new(contribution_projector);
		observer.on_new_event(&event, 0).await;
	}
}
