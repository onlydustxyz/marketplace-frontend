/// This module provides a `Usecase` struct with a method to remove a sponsor from a project.
use anyhow::Result;
use domain::{DomainError, ProjectId};
use tracing::instrument;

use crate::{domain::SponsorId, infrastructure::database::ProjectSponsorRepository};

/// The `Usecase` struct is used to remove a sponsor from a project.
pub struct Usecase {
    project_sponsor_repository: ProjectSponsorRepository,
}

impl Usecase {
    /// Creates a new `Usecase` instance with the provided `ProjectSponsorRepository`.
    pub fn new(project_sponsor_repository: ProjectSponsorRepository) -> Self {
        Self {
            project_sponsor_repository,
        }
    }

    /// Removes a sponsor from a project using the `ProjectSponsorRepository`.
    #[instrument(skip(self))]
    pub fn remove_sponsor(
        &self,
        project_id: &ProjectId,
        sponsor_id: &SponsorId,
    ) -> Result<(), DomainError> {
        self.project_sponsor_repository.delete(project_id, sponsor_id)?;
        Ok(())
    }
}