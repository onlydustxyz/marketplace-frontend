use crate::domain::ProjectDetails;
use anyhow::Result;
use domain::{EntityRepository, ProjectId};
use std::sync::Arc;

pub struct Usecase {
	project_details_repository: Arc<dyn EntityRepository<ProjectDetails>>,
}

impl Usecase {
	pub fn new(project_details_repository: Arc<dyn EntityRepository<ProjectDetails>>) -> Self {
		Self {
			project_details_repository,
		}
	}

	pub async fn update(
		&self,
		project_id: ProjectId,
		description: Option<String>,
		telegram_link: Option<String>,
	) -> Result<()> {
		self.project_details_repository.upsert(&ProjectDetails::new(
			project_id,
			description,
			telegram_link,
		))?;

		Ok(())
	}
}
