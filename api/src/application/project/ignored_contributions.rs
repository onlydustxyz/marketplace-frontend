use std::sync::Arc;

use anyhow::Result;
use derive_more::Constructor;
use domain::{DomainError, ProjectId};
use infrastructure::database::ImmutableRepository;
use tracing::instrument;

use crate::models::*;

#[derive(Constructor)]
pub struct Usecase {
	ignored_contributions_repository: Arc<dyn ImmutableRepository<IgnoredContribution>>,
}

impl Usecase {
	#[instrument(skip(self))]
	pub fn add(&self, project_id: ProjectId, contribution_id: String) -> Result<(), DomainError> {
		self.ignored_contributions_repository.try_insert(IgnoredContribution {
			project_id,
			contribution_id,
		})?;
		Ok(())
	}

	#[instrument(skip(self))]
	pub fn remove(
		&self,
		project_id: ProjectId,
		contribution_id: String,
	) -> Result<(), DomainError> {
		self.ignored_contributions_repository.delete((project_id, contribution_id))?;
		Ok(())
	}
}
