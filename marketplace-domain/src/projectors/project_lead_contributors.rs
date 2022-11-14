use crate::*;
use async_trait::async_trait;
use log::error;
use std::sync::Arc;
use uuid::Uuid;

pub struct LeadContributorProjector {
	lead_contributor_projection_repository: Arc<dyn LeadContributorProjectionRepository>,
}

impl LeadContributorProjector {
	pub fn new(
		lead_contributor_projection_repository: Arc<dyn LeadContributorProjectionRepository>,
	) -> Self {
		Self {
			lead_contributor_projection_repository,
		}
	}

	fn on_lead_contributor_added(
		&self,
		project_id: &ProjectId,
		contributor_id: Uuid,
	) -> Result<(), LeadContributorProjectionRepositoryError> {
		self.lead_contributor_projection_repository
			.upsert(LeadContributorProjection::new(*project_id, contributor_id))
	}

	fn on_lead_contributor_removed(
		&self,
		project_id: &ProjectId,
		contributor_id: Uuid,
	) -> Result<(), LeadContributorProjectionRepositoryError> {
		self.lead_contributor_projection_repository.delete(project_id, contributor_id)
	}
}

#[async_trait]
impl EventListener for LeadContributorProjector {
	async fn on_event(&self, event: &Event) {
		let result = match event {
			Event::Project(project_event) => match project_event {
				ProjectEvent::LeadContributorAdded {
					project_id,
					contributor_id,
				} => self.on_lead_contributor_added(project_id, *contributor_id),
				ProjectEvent::LeadContributorRemoved {
					project_id,
					contributor_id,
				} => self.on_lead_contributor_removed(project_id, *contributor_id),
			},
			_ => return,
		};

		if let Err(error) = result {
			error!("Failed while projecting ProjectEvent {event}: {}", error);
		}
	}
}

#[cfg(test)]
mod tests {
	use std::str::FromStr;

	use super::*;
	use mockall::predicate::eq;
	use rstest::*;

	#[fixture]
	fn lead_contributor_projection_repository() -> MockLeadContributorProjectionRepository {
		MockLeadContributorProjectionRepository::new()
	}

	#[fixture]
	fn project_id() -> ProjectId {
		1324
	}

	#[fixture]
	fn contributor_id() -> Uuid {
		Uuid::from_str("3d863031-e9bb-42dc-becd-67999675fb8b").unwrap()
	}

	#[fixture]
	fn on_lead_contributor_added_event(project_id: ProjectId, contributor_id: Uuid) -> Event {
		Event::Project(ProjectEvent::LeadContributorAdded {
			project_id,
			contributor_id,
		})
	}

	#[fixture]
	fn on_lead_contributor_removed_event(project_id: ProjectId, contributor_id: Uuid) -> Event {
		Event::Project(ProjectEvent::LeadContributorRemoved {
			project_id,
			contributor_id,
		})
	}

	#[rstest]
	#[case(on_lead_contributor_added_event(project_id(), contributor_id()))]
	async fn on_lead_contributor_added(
		mut lead_contributor_projection_repository: MockLeadContributorProjectionRepository,
		#[case] event: Event,
		project_id: ProjectId,
		contributor_id: Uuid,
	) {
		lead_contributor_projection_repository
			.expect_upsert()
			.with(eq(LeadContributorProjection::new(
				project_id,
				contributor_id,
			)))
			.times(1)
			.returning(|_| Ok(()));

		let projector =
			LeadContributorProjector::new(Arc::new(lead_contributor_projection_repository));
		projector.on_event(&event).await;
	}

	#[rstest]
	#[case(on_lead_contributor_removed_event(project_id(), contributor_id()))]
	async fn on_lead_contributor_removed(
		mut lead_contributor_projection_repository: MockLeadContributorProjectionRepository,
		#[case] event: Event,
		project_id: ProjectId,
		contributor_id: Uuid,
	) {
		lead_contributor_projection_repository
			.expect_delete()
			.with(eq(project_id), eq(contributor_id))
			.times(1)
			.returning(|_, _| Ok(()));

		let projector =
			LeadContributorProjector::new(Arc::new(lead_contributor_projection_repository));
		projector.on_event(&event).await;
	}
}
