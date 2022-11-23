use crate::domain::{projections::Project, EventListener, Payment, ProjectionRepository};
use anyhow::Result;
use async_trait::async_trait;
use domain::{Event, ProjectEvent};
use std::sync::Arc;

pub struct Projector {
	repository: Arc<dyn ProjectionRepository<Project>>,
}

impl Projector {
	pub fn new(repository: Arc<dyn ProjectionRepository<Project>>) -> Self {
		Self { repository }
	}
}

#[async_trait]
impl EventListener for Projector {
	async fn on_event(&self, event: &Event) -> Result<()> {
		if let Event::Project(event) = event {
			match event {
				ProjectEvent::Created { id, name } =>
					__self.repository.insert(&Project::new((*id).into(), name.to_owned()))?,
				ProjectEvent::LeaderAssigned { id, leader_id } => todo!(),
			}
		}
		Ok(())
	}
}
