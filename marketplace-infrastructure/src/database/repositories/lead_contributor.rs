use anyhow::anyhow;
use diesel::prelude::*;
use itertools::Itertools;
use log::error;
use marketplace_domain::{
	LeadContributorProjection, LeadContributorProjectionRepository,
	LeadContributorProjectionRepositoryError, ProjectId, ProjectionRepository,
	ProjectionRepositoryError,
};
use uuid::Uuid;

use crate::database::{models, schema::lead_contributors::dsl, Client, DatabaseError};

impl ProjectionRepository<LeadContributorProjection> for Client {
	fn clear(&self) -> Result<(), ProjectionRepositoryError> {
		self.clear_table(dsl::lead_contributors)
			.map_err(|e| ProjectionRepositoryError::Infrastructure(e.into()))
	}
}

impl LeadContributorProjectionRepository for Client {
	fn upsert(
		&self,
		lead_contributor: LeadContributorProjection,
	) -> Result<(), LeadContributorProjectionRepositoryError> {
		let connection =
			self.connection().map_err(LeadContributorProjectionRepositoryError::from)?;

		let lead_contributor = models::LeadContributor::from(lead_contributor);

		diesel::insert_into(dsl::lead_contributors)
			.values(&lead_contributor)
			.on_conflict((dsl::project_id, dsl::contributor_id))
			.do_nothing()
			.execute(&*connection)
			.map_err(|e| {
				error!("Failed to insert lead contributor {lead_contributor:?}: {e}");
				DatabaseError::from(e)
			})?;

		Ok(())
	}

	fn delete(
		&self,
		project_id: &ProjectId,
		contributor_id: Uuid,
	) -> Result<(), LeadContributorProjectionRepositoryError> {
		let connection =
			self.connection().map_err(LeadContributorProjectionRepositoryError::from)?;

		diesel::delete(dsl::lead_contributors)
			.filter(dsl::project_id.eq(project_id.to_string()))
			.filter(dsl::contributor_id.eq(contributor_id))
			.execute(&*connection)
			.map_err(DatabaseError::from)?;

		Ok(())
	}

	fn list_by_project(
		&self,
		project_id: &marketplace_domain::ProjectId,
	) -> Result<Vec<LeadContributorProjection>, LeadContributorProjectionRepositoryError> {
		let connection =
			self.connection().map_err(LeadContributorProjectionRepositoryError::from)?;

		let lead_contributors = dsl::lead_contributors
			.filter(dsl::project_id.eq(project_id.to_string()))
			.load::<models::LeadContributor>(&*connection)
			.map_err(DatabaseError::from)?;

		Ok(lead_contributors.into_iter().map_into().collect())
	}
}

impl From<models::LeadContributor> for LeadContributorProjection {
	fn from(lead_contributor: models::LeadContributor) -> Self {
		LeadContributorProjection::new(
			lead_contributor.project_id.parse().unwrap(),
			lead_contributor.contributor_id,
		)
	}
}

impl From<LeadContributorProjection> for models::LeadContributor {
	fn from(lead_contributor: LeadContributorProjection) -> Self {
		Self {
			project_id: lead_contributor.project_id().to_string(),
			contributor_id: *lead_contributor.contributor_id(),
		}
	}
}

impl From<DatabaseError> for LeadContributorProjectionRepositoryError {
	fn from(error: DatabaseError) -> Self {
		match error {
			DatabaseError::Transaction(diesel::result::Error::DatabaseError(kind, _)) => match kind
			{
				diesel::result::DatabaseErrorKind::UniqueViolation =>
					Self::AlreadyExist(anyhow!(error)),
				_ => Self::Infrastructure(anyhow!(error)),
			},
			DatabaseError::Transaction(diesel::result::Error::NotFound) => Self::NotFound,
			_ => Self::Infrastructure(anyhow!(error)),
		}
	}
}
