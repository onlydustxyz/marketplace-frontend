use anyhow::Result;
use async_trait::async_trait;
use domain::{Event, ProjectEvent, SubscriberCallbackError};
use tracing::instrument;

use crate::{
	domain::{projections::Project, EventListener},
	infrastructure::database::{ProjectLeadRepository, ProjectRepository},
};

pub struct Projector {
	project_repository: ProjectRepository,
	project_lead_repository: ProjectLeadRepository,
}

impl Projector {
	pub fn new(
		project_repository: ProjectRepository,
		project_lead_repository: ProjectLeadRepository,
	) -> Self {
		Self {
			project_repository,
			project_lead_repository,
		}
	}
}

#[async_trait]
impl EventListener for Projector {
	#[instrument(name = "project_projection", skip(self))]
	async fn on_event(&self, event: &Event) -> Result<(), SubscriberCallbackError> {
		match event {
			Event::Project(event) => match event {
				ProjectEvent::Created { id } => {
					self.project_repository.try_insert(&Project::new(*id))?;
				},
				ProjectEvent::LeaderAssigned { id, leader_id } =>
					self.project_lead_repository.upsert(id, leader_id)?,
				ProjectEvent::LeaderUnassigned { id, leader_id } =>
					self.project_lead_repository.delete(id, leader_id)?,
				ProjectEvent::Budget { .. } => (),
			},
		}

		Ok(())
	}
}
