use super::*;
use std::sync::Arc;

pub struct ProjectObserver<P: Projection<A = ProjectAggregate>> {
	projector: Arc<dyn EventHandler<P>>,
}

impl<P: Projection<A = ProjectAggregate>> ProjectObserver<P> {
	pub fn new(projector: Arc<dyn EventHandler<P>>) -> Self {
		Self { projector }
	}
}

#[async_trait]
impl<P: Projection<A = ProjectAggregate>> Observer for ProjectObserver<P> {
	async fn on_new_event(&self, event: &ObservedEvent, _block_number: u64) {
		self.projector.handle(&event.event).await;
	}
}

#[cfg(test)]
mod test {
	use super::*;
	use async_trait::async_trait;
	use mockall::{mock, predicate::*};
	use rstest::*;

	mock! {
		pub ProjectProjector {}

		#[async_trait]
		impl EventHandler<ProjectMemberProjection> for ProjectProjector {
			async fn handle(&self, event: &Event);
		}
	}

	#[fixture]
	fn project_event() -> ProjectEvent {
		ProjectEvent::MemberAdded {
			project_id: Default::default(),
			contributor_account: Default::default(),
		}
	}

	#[fixture]
	fn event(project_event: ProjectEvent) -> ObservedEvent {
		ObservedEvent {
			event: Event::Project(project_event),
			..Default::default()
		}
	}

	#[fixture]
	fn project_projector() -> MockProjectProjector {
		MockProjectProjector::new()
	}

	#[rstest]
	async fn on_contribution_created_event(
		mut project_projector: MockProjectProjector,
		project_event: ProjectEvent,
		event: ObservedEvent,
	) {
		project_projector
			.expect_handle()
			.with(eq(Event::Project(project_event)))
			.return_const(());

		let observer = ProjectObserver::new(Arc::new(project_projector));
		observer.on_new_event(&event, 0).await;
	}
}
