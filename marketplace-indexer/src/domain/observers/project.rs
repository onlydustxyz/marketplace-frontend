use super::*;
use std::sync::Arc;

pub struct ProjectObserver<P: Projection<A = ProjectAggregate>> {
	projector: Arc<dyn Projector<P>>,
}

impl<P: Projection<A = ProjectAggregate>> ProjectObserver<P> {
	pub fn new(projector: Arc<dyn Projector<P>>) -> Self {
		Self { projector }
	}
}

#[async_trait]
impl<P: Projection<A = ProjectAggregate>> Observer for ProjectObserver<P> {
	async fn on_new_event(&self, event: &ObservedEvent, _block_number: u64) {
		if let Event::Project(event) = &event.event {
			self.projector.project(event).await;
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
		pub ProjectProjector {}

		#[async_trait]
		impl Projector<ProjectMemberProjection> for ProjectProjector {
			async fn project(&self, event: &ProjectEvent);
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
		project_projector.expect_project().with(eq(project_event)).return_const(());

		let observer = ProjectObserver::new(Arc::new(project_projector));
		observer.on_new_event(&event, 0).await;
	}
}
