use crate::domain::{ProjectLead, ProjectLeadRepository, ProjectLeadRepositoryError};
use async_trait::async_trait;
use marketplace_domain::{Event, EventListener, ProjectEvent, ProjectId};
use std::sync::Arc;
use tracing::error;
use uuid::Uuid;

pub struct ProjectLeadProjector {
	project_lead_repository: Arc<dyn ProjectLeadRepository>,
}

impl ProjectLeadProjector {
	pub fn new(project_lead_repository: Arc<dyn ProjectLeadRepository>) -> Self {
		Self {
			project_lead_repository,
		}
	}

	fn on_lead_contributor_added(
		&self,
		project_id: &ProjectId,
		contributor_id: Uuid,
	) -> Result<(), ProjectLeadRepositoryError> {
		self.project_lead_repository.upsert(ProjectLead {
			project_id: *project_id,
			user_id: contributor_id,
		})
	}

	fn on_lead_contributor_removed(
		&self,
		project_id: &ProjectId,
		contributor_id: Uuid,
	) -> Result<(), ProjectLeadRepositoryError> {
		self.project_lead_repository.delete(project_id, contributor_id)
	}
}

#[async_trait]
impl EventListener for ProjectLeadProjector {
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
	use super::*;
	use crate::domain::*;
	use mockall::predicate::eq;
	use rstest::*;
	use std::str::FromStr;

	#[fixture]
	fn lead_contributor_projection_repository() -> MockProjectLeadRepository {
		MockProjectLeadRepository::new()
	}

	#[fixture]
	fn project_id() -> ProjectId {
		Uuid::from_u128(1324).into()
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
		mut lead_contributor_projection_repository: MockProjectLeadRepository,
		#[case] event: Event,
		project_id: ProjectId,
		contributor_id: Uuid,
	) {
		lead_contributor_projection_repository
			.expect_upsert()
			.with(eq(ProjectLead {
				project_id,
				user_id: contributor_id,
			}))
			.times(1)
			.returning(|_| Ok(()));

		let projector = ProjectLeadProjector::new(Arc::new(lead_contributor_projection_repository));
		projector.on_event(&event).await;
	}

	#[rstest]
	#[case(on_lead_contributor_removed_event(project_id(), contributor_id()))]
	async fn on_lead_contributor_removed(
		mut lead_contributor_projection_repository: MockProjectLeadRepository,
		#[case] event: Event,
		project_id: ProjectId,
		contributor_id: Uuid,
	) {
		lead_contributor_projection_repository
			.expect_delete()
			.with(eq(project_id), eq(contributor_id))
			.times(1)
			.returning(|_, _| Ok(()));

		let projector = ProjectLeadProjector::new(Arc::new(lead_contributor_projection_repository));
		projector.on_event(&event).await;
	}
}
