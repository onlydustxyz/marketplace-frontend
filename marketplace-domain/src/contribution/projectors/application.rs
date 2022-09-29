use crate::*;
use async_trait::async_trait;
use chrono::NaiveDateTime;
use log::error;
use std::sync::Arc;

pub struct ApplicationProjector {
	application_projection_repository: Arc<dyn ApplicationProjectionRepository>,
}

impl ApplicationProjector {
	pub fn new(
		application_projection_repository: Arc<dyn ApplicationProjectionRepository>,
	) -> Self {
		Self {
			application_projection_repository,
		}
	}

	fn on_applied(
		&self,
		contribution_id: &ContributionId,
		contributor_id: &ContributorId,
		applied_at: &NaiveDateTime,
	) -> Result<(), ApplicationProjectionRepositoryError> {
		let application = ApplicationProjection::new(
			contribution_id.clone(),
			contributor_id.clone(),
			*applied_at,
		);

		self.application_projection_repository.insert(application)
	}

	fn on_application_refused(
		&self,
		contribution_id: &ContributionId,
		contributor_id: &ContributorId,
	) -> Result<(), ApplicationProjectionRepositoryError> {
		self.application_projection_repository.delete(contribution_id, contributor_id)
	}

	fn on_assigned(
		&self,
		contribution_id: &ContributionId,
		contributor_id: &ContributorId,
	) -> Result<(), ApplicationProjectionRepositoryError> {
		self.application_projection_repository.delete(contribution_id, contributor_id)
	}
}

#[async_trait]
impl EventListener for ApplicationProjector {
	async fn on_event(&self, event: &Event) {
		let result = match event {
			Event::Contribution(contribution_event) => match contribution_event {
				ContributionEvent::Applied {
					id: contribution_id,
					contributor_id,
					applied_at,
				} => self.on_applied(contribution_id, contributor_id, applied_at),
				ContributionEvent::ApplicationRefused {
					id: contribution_id,
					contributor_id,
				} => self.on_application_refused(contribution_id, contributor_id),
				ContributionEvent::Assigned {
					id: contribution_id,
					contributor_id,
				}
				| ContributionEvent::Claimed {
					id: contribution_id,
					contributor_id,
				} => self.on_assigned(contribution_id, contributor_id),
				ContributionEvent::Deployed { .. }
				| ContributionEvent::Unassigned { .. }
				| ContributionEvent::Created { .. }
				| ContributionEvent::Validated { .. }
				| ContributionEvent::GateChanged { .. } => return,
			},
			Event::Project(_) | Event::Contributor(_) => return,
		};

		if let Err(error) = result {
			error!("Failed to project event {event}: {}", error.to_string());
		}
	}
}
