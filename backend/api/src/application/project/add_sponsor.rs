/// Defines a usecase to add a sponsor to a project.
use anyhow::Result;
use domain::{DomainError, ProjectId};
use tracing::instrument;

use crate::{domain::SponsorId, infrastructure::database::ProjectSponsorRepository};

/// Defines a `Usecase` structure.
pub struct Usecase {
    project_sponsor_repository: ProjectSponsorRepository,
}

impl Usecase {
    /// Returns a new instance of `Usecase`.
    ///
    /// # Arguments
    ///
    /// * `project_sponsor_repository` - A `ProjectSponsorRepository` instance.
    pub fn new(project_sponsor_repository: ProjectSponsorRepository) -> Self {
        Self {
            project_sponsor_repository,
        }
    }

    /// Adds a sponsor to a project.
    ///
    /// # Arguments
    ///
    /// * `project_id` - The ID of the project.
    /// * `sponsor_id` - The ID of the sponsor.
    ///
    /// # Returns
    ///
    /// Returns `Ok(())` if the sponsor is added successfully. Otherwise, returns a `DomainError`.
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