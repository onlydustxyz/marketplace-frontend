use crate::domain::{
	projections::{Project, ProjectLead},
	EventListener, ProjectLeadRepository,
};
use anyhow::Result;
use async_trait::async_trait;
use domain::{EntityRepository, Event, ProjectEvent};
use std::sync::Arc;

pub struct Projector {
	project_repository: Arc<dyn EntityRepository<Project>>,
	project_lead_repository: Arc<dyn ProjectLeadRepository>,
}

impl Projector {
	pub fn new(
		project_repository: Arc<dyn EntityRepository<Project>>,
		project_lead_repository: Arc<dyn ProjectLeadRepository>,
	) -> Self {
		Self {
			project_repository,
			project_lead_repository,
		}
	}
}

#[async_trait]
impl EventListener for Projector {
	async fn on_event(&self, event: &Event) -> Result<()> {
		if let Event::Project(event) = event {
			match event {
				ProjectEvent::Created { id, name } =>
					self.project_repository.insert(&Project::new((*id).into(), name.to_owned()))?,
				ProjectEvent::LeaderAssigned { id, leader_id } => self
					.project_lead_repository
					.insert(&ProjectLead::new((*id).into(), (*leader_id).into()))?,
			}
		}
		Ok(())
	}
}
