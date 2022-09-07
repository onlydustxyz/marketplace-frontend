use crate::database::{
	models,
	schema::projects::{self, dsl::*},
	Client, DatabaseError,
};
use anyhow::anyhow;
use diesel::{prelude::*, query_dsl::BelongingToDsl};
use itertools::Itertools;
use marketplace_domain::*;
use std::str::FromStr;

impl ProjectRepository for Client {
	fn find_all_with_contributions(
		&self,
	) -> Result<Vec<ProjectWithContributions>, ProjectRepositoryError> {
		let connection = self.connection().map_err(ProjectRepositoryError::from)?;

		let project_list =
			projects.load::<models::Project>(&*connection).map_err(DatabaseError::from)?;

		let contribution_list = models::Contribution::belonging_to(&project_list)
			.load::<models::Contribution>(&*connection)
			.map_err(DatabaseError::from)?
			.grouped_by(&project_list);

		let result = project_list
			.into_iter()
			.zip(contribution_list)
			.map(|(project, contributions)| ProjectWithContributions {
				project: project.into(),
				contributions: contributions.into_iter().map_into().collect(),
			})
			.collect_vec();

		Ok(result)
	}
}

impl From<models::Project> for Project {
	fn from(project: models::Project) -> Self {
		Self {
			id: project.id.parse().unwrap(),
			name: project.name,
			owner: project.owner,
		}
	}
}

impl From<ProjectProjection> for models::NewProject {
	fn from(project: ProjectProjection) -> Self {
		Self {
			id: project.id().to_string(),
			name: project.name().clone(),
			owner: project.owner().clone(),
		}
	}
}

impl From<models::Contribution> for ContributionProjection {
	fn from(contribution: models::Contribution) -> Self {
		Self {
			id: contribution.id.parse().unwrap(),
			contributor_id: contribution
				.contributor_id
				.map(|id_| ContributorId::from_str(id_.as_str()).unwrap()),
			project_id: contribution.project_id.parse().unwrap(),
			issue_number: contribution.issue_number.parse().unwrap(),
			status: contribution.status.parse().unwrap_or(ContributionStatus::Open),
			// Safe to unwrap because the value stored can only come from an u8
			gate: contribution.gate.try_into().unwrap(),
			description: contribution.description,
			external_link: contribution.external_link.map(|link| url::Url::parse(&link).unwrap()),
			title: contribution.title,
			metadata: ContributionProjectionMetadata {
				difficulty: contribution.difficulty,
				technology: contribution.technology,
				duration: contribution.duration,
				context: contribution.context,
				r#type: contribution.type_,
			},
		}
	}
}

impl From<DatabaseError> for ProjectRepositoryError {
	fn from(error: DatabaseError) -> Self {
		match error {
			DatabaseError::Transaction(diesel::result::Error::DatabaseError(kind, _)) => match kind
			{
				diesel::result::DatabaseErrorKind::UniqueViolation =>
					Self::AlreadyExist(Box::new(error)),
				_ => Self::Infrastructure(Box::new(error)),
			},
			DatabaseError::Transaction(diesel::result::Error::NotFound) => Self::NotFound,
			_ => Self::Infrastructure(Box::new(error)),
		}
	}
}

impl ProjectProjectionRepository for Client {
	fn store(&self, project: ProjectProjection) -> Result<(), ProjectProjectionRepositoryError> {
		let connection = self.connection().map_err(ProjectProjectionRepositoryError::from)?;

		let project: models::NewProject = project.into();
		diesel::insert_into(projects::table)
			.values(&project)
			.on_conflict(id)
			.do_update()
			.set(&project)
			.execute(&*connection)
			.map_err(DatabaseError::from)?;

		Ok(())
	}
}

impl ProjectionRepository<ProjectProjection> for Client {
	fn clear(&self) -> Result<(), ProjectionRepositoryError> {
		let connection = self
			.connection()
			.map_err(anyhow::Error::msg)
			.map_err(ProjectionRepositoryError::Infrastructure)?;

		diesel::delete(projects::dsl::projects)
			.execute(&*connection)
			.map_err(anyhow::Error::msg)
			.map_err(ProjectionRepositoryError::Infrastructure)?;

		Ok(())
	}
}

impl From<DatabaseError> for ProjectProjectionRepositoryError {
	fn from(error: DatabaseError) -> Self {
		match error {
			DatabaseError::Transaction(diesel::result::Error::DatabaseError(kind, _)) => match kind
			{
				diesel::result::DatabaseErrorKind::UniqueViolation =>
					Self::AlreadyExist(anyhow!(error)),
				_ => Self::Infrastructure(anyhow!(error)),
			},
			DatabaseError::Transaction(diesel::result::Error::NotFound) =>
				Self::NotFound(anyhow!(error)),
			_ => Self::Infrastructure(anyhow!(error)),
		}
	}
}
