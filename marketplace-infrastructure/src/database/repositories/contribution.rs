use crate::database::{models, schema, schema::contributions, Client, DatabaseError};
use diesel::prelude::*;
use itertools::Itertools;
use log::error;
use marketplace_domain::*;

impl ContributionProjectionRepository for Client {
	fn find_by_id(
		&self,
		contribution_id: &ContributionId,
	) -> Result<Option<ContributionProjection>, ContributionProjectionRepositoryError> {
		let connection = self
			.connection()
			.map_err(|e| ContributionProjectionRepositoryError::Infrastructure(e.into()))?;

		match contributions::table
			.find(contribution_id.to_string())
			.get_result::<models::Contribution>(&*connection)
		{
			Ok(contribution) => Ok(Some(contribution.into())),
			Err(diesel::NotFound) => Ok(None),
			Err(e) => Err(ContributionProjectionRepositoryError::Infrastructure(
				e.into(),
			)),
		}
	}

	fn create(
		&self,
		contribution: ContributionProjection,
	) -> Result<(), ContributionProjectionRepositoryError> {
		let connection = self
			.connection()
			.map_err(|e| ContributionProjectionRepositoryError::Infrastructure(e.into()))?;

		let contribution = models::Contribution::from(contribution);
		diesel::insert_into(contributions::table)
			.values(&contribution)
			.execute(&*connection)
			.map_err(DatabaseError::from)?;

		Ok(())
	}

	fn update_contributor_and_status(
		&self,
		contribution_id: ContributionId,
		contributor_id_: Option<ContributorId>,
		status_: ContributionStatus,
	) -> Result<(), ContributionProjectionRepositoryError> {
		let connection = self.connection().map_err(ContributionProjectionRepositoryError::from)?;

		diesel::update(schema::contributions::dsl::contributions)
			.filter(contributions::id.eq(contribution_id.to_string()))
			.set((
				schema::contributions::status.eq(status_.to_string()),
				schema::contributions::contributor_id.eq(match contributor_id_ {
					Some(id_) => id_.to_string(),
					None => String::new(),
				}),
			))
			.execute(&*connection)
			.map_err(DatabaseError::from)?;

		Ok(())
	}

	fn update_status(
		&self,
		contribution_id: ContributionId,
		status_: ContributionStatus,
	) -> Result<(), ContributionProjectionRepositoryError> {
		let connection = self.connection().map_err(ContributionProjectionRepositoryError::from)?;

		diesel::update(schema::contributions::dsl::contributions)
			.filter(contributions::id.eq(contribution_id.to_string()))
			.set((schema::contributions::status.eq(status_.to_string()),))
			.execute(&*connection)
			.map_err(DatabaseError::from)?;

		Ok(())
	}

	fn list_by_project(
		&self,
		project_id: &GithubProjectId,
	) -> Result<Vec<ContributionProjection>, ContributionProjectionRepositoryError> {
		let connection = self.connection().map_err(ContributionProjectionRepositoryError::from)?;

		let contributions = schema::contributions::table
			.filter(contributions::project_id.eq(project_id.to_string()))
			.load::<models::Contribution>(&*connection)
			.map_err(DatabaseError::from)?;

		Ok(contributions.into_iter().map_into().collect())
	}
}

impl ProjectionRepository<ContributionProjection> for Client {
	fn clear(&self) -> Result<(), ProjectionRepositoryError> {
		let connection = self
			.connection()
			.map_err(|e| {
				error!("Failed while trying to get connection from pool: {e}");
				e
			})
			.map_err(anyhow::Error::msg)
			.map_err(ProjectionRepositoryError::Infrastructure)?;

		diesel::delete(schema::contributions::dsl::contributions)
			.execute(&*connection)
			.map_err(|e| {
				error!("Failed while trying to clear contributions table: {e}");
				e
			})
			.map_err(anyhow::Error::msg)
			.map_err(ProjectionRepositoryError::Infrastructure)?;

		Ok(())
	}
}

impl From<ContributionProjection> for models::Contribution {
	fn from(contribution: ContributionProjection) -> Self {
		Self {
			id: contribution.id.to_string(),
			project_id: contribution.project_id.to_string(),
			issue_number: contribution.issue_number.to_string(),
			status: contribution.status.to_string(),
			contributor_id: contribution.contributor_id.map(|id| id.to_string()),
			gate: contribution.gate as i32,
			title: contribution.title,
			description: contribution.description,
			external_link: contribution.external_link.map(|link| link.to_string()),
			difficulty: contribution.metadata.difficulty,
			technology: contribution.metadata.technology,
			duration: contribution.metadata.duration,
			context: contribution.metadata.context,
			type_: contribution.metadata.r#type,
		}
	}
}

impl From<DatabaseError> for ContributionProjectionRepositoryError {
	fn from(error: DatabaseError) -> Self {
		use diesel::result::{DatabaseErrorKind, Error as DieselError};

		match error {
			DatabaseError::Transaction(DieselError::DatabaseError(
				DatabaseErrorKind::UniqueViolation,
				_,
			)) => Self::AlreadyExist(Box::new(error)),
			DatabaseError::Transaction(DieselError::NotFound) => Self::NotFound,
			_ => Self::Infrastructure(Box::new(error)),
		}
	}
}
