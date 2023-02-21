use anyhow::Result;
use domain::{DomainError, ProjectId};
use tracing::instrument;

use crate::{domain::SponsorId, infrastructure::database::ProjectSponsorRepository};

pub struct Usecase {
	project_sponsor_repository: ProjectSponsorRepository,
}

impl Usecase {
	pub fn new(project_sponsor_repository: ProjectSponsorRepository) -> Self {
		Self {
			project_sponsor_repository,
		}
	}

	#[instrument(skip(self))]
	pub fn add_sponsor(
		&self,
		project_id: &ProjectId,
		sponsor_id: &SponsorId,
	) -> Result<(), DomainError> {
		self.project_sponsor_repository.try_insert(project_id, sponsor_id)?;
		Ok(())
	}
}
