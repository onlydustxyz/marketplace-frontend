use std::sync::Arc;

use anyhow::Result;
use domain::{sponsor, DomainError, ProjectId};
use infrastructure::dbclient::ImmutableRepository;
use tracing::instrument;

use crate::models::*;

pub struct Usecase {
	project_sponsor_repository: Arc<dyn ImmutableRepository<ProjectsSponsor>>,
}

impl Usecase {
	pub fn new(project_sponsor_repository: Arc<dyn ImmutableRepository<ProjectsSponsor>>) -> Self {
		Self {
			project_sponsor_repository,
		}
	}

	#[instrument(skip(self))]
	pub fn add_sponsor(
		&self,
		project_id: ProjectId,
		sponsor_id: sponsor::Id,
	) -> Result<(), DomainError> {
		self.project_sponsor_repository.try_insert(ProjectsSponsor {
			project_id,
			sponsor_id,
		})?;
		Ok(())
	}
}
