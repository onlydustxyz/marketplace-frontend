use crate::{
	domain::{projections::Project, EventListener},
	infrastructure::database::{ProjectLeadRepository, ProjectRepository},
};
use anyhow::Result;
use async_trait::async_trait;
use domain::{Event, MappingRepository, ProjectEvent};

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
	async fn on_event(&self, event: &Event) -> Result<()> {
		if let Event::Project(event) = event {
			match event {
				ProjectEvent::Created {
					id,
					name,
					github_repo_id,
				} => self.project_repository.insert(&Project::new(
					(*id).into(),
					name.to_owned(),
					(*github_repo_id).into(),
				))?,
				ProjectEvent::LeaderAssigned { id, leader_id } =>
					self.project_lead_repository.insert(id, leader_id)?,
			}
		}
		Ok(())
	}
}
