use crate::*;
use async_trait::async_trait;
use chrono::NaiveDateTime;
use log::error;
use std::sync::Arc;

pub struct ApplicationProjector {
	application_projection_repository: Arc<dyn ApplicationProjectionRepository>,
	uuid_generator: Arc<dyn UuidGenerator>,
}

impl ApplicationProjector {
	pub fn new(
		application_projection_repository: Arc<dyn ApplicationProjectionRepository>,
		uuid_generator: Arc<dyn UuidGenerator>,
	) -> Self {
		Self {
			application_projection_repository,
			uuid_generator,
		}
	}

	fn on_applied(
		&self,
		contribution_id: &ContributionId,
		contributor_id: &ContributorId,
		applied_at: &NaiveDateTime,
	) -> Result<(), ApplicationProjectionRepositoryError> {
		let application = ApplicationProjection::new(
			self.uuid_generator.new_uuid().into(),
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
		self.application_projection_repository.update_status(
			contribution_id,
			contributor_id,
			ApplicationStatus::Refused,
		)
	}

	fn on_assigned(
		&self,
		contribution_id: &ContributionId,
		contributor_id: &ContributorId,
	) -> Result<(), ApplicationProjectionRepositoryError> {
		self.application_projection_repository.update_status(
			contribution_id,
			contributor_id,
			ApplicationStatus::Accepted,
		)
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
				ContributionEvent::Unassigned { .. }
				| ContributionEvent::Created { .. }
				| ContributionEvent::Validated { .. }
				| ContributionEvent::GateChanged { .. } => return,
			},
			Event::Project(_) => return,
		};

		if let Err(error) = result {
			error!("Failed to project event {event}: {}", error.to_string());
		}
	}
}
