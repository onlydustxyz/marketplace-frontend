use marketplace_domain::*;

use crate::database::{models, schema, schema::contributions, Client, DatabaseError};
use diesel::prelude::*;

impl ContributionRepository for Client {
	fn find_by_id(
		&self,
		contribution_id: &ContributionId,
	) -> Result<Option<ContributionProjection>, ContributionRepositoryError> {
		let connection = self
			.connection()
			.map_err(|e| ContributionRepositoryError::Infrastructure(e.into()))?;

		match contributions::table
			.find(contribution_id.to_string())
			.get_result::<models::Contribution>(&*connection)
		{
			Ok(contribution) => Ok(Some(contribution.into())),
			Err(diesel::NotFound) => Ok(None),
			Err(e) => Err(ContributionRepositoryError::Infrastructure(e.into())),
		}
	}

	fn create(
		&self,
		contribution: ContributionProjection,
	) -> Result<(), ContributionRepositoryError> {
		let connection = self
			.connection()
			.map_err(|e| ContributionRepositoryError::Infrastructure(e.into()))?;

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
	) -> Result<(), ContributionRepositoryError> {
		let connection = self.connection().map_err(ContributionRepositoryError::from)?;

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
	) -> Result<(), ContributionRepositoryError> {
		let connection = self.connection().map_err(ContributionRepositoryError::from)?;

		diesel::update(schema::contributions::dsl::contributions)
			.filter(contributions::id.eq(contribution_id.to_string()))
			.set((schema::contributions::status.eq(status_.to_string()),))
			.execute(&*connection)
			.map_err(DatabaseError::from)?;

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

impl From<DatabaseError> for ContributionRepositoryError {
	fn from(error: DatabaseError) -> Self {
		match error {
			DatabaseError::Transaction(diesel::result::Error::DatabaseError(kind, _)) => match kind
			{
				diesel::result::DatabaseErrorKind::UniqueViolation =>
					Self::AlreadyExist(Box::new(error)),
				diesel::result::DatabaseErrorKind::ForeignKeyViolation =>
					Self::InvalidEntity(Box::new(error)),
				_ => Self::Infrastructure(Box::new(error)),
			},
			DatabaseError::Transaction(diesel::result::Error::NotFound) => Self::NotFound,
			_ => Self::Infrastructure(Box::new(error)),
		}
	}
}
