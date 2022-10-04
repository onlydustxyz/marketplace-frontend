use crate::database::{models, schema::contributions::dsl, Client, DatabaseError};
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

		match dsl::contributions
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

	fn insert(
		&self,
		contribution: ContributionProjection,
	) -> Result<(), ContributionProjectionRepositoryError> {
		let connection = self.connection().map_err(ContributionProjectionRepositoryError::from)?;

		let contribution = models::Contribution::from(contribution);

		diesel::insert_into(dsl::contributions)
			.values(&contribution)
			.execute(&*connection)
			.map_err(|e| {
				error!("Failed to insert contribution {contribution:?}: {e}");
				DatabaseError::from(e)
			})?;

		Ok(())
	}

	fn update_contributor_and_status(
		&self,
		contribution_id: ContributionId,
		contributor_id_: Option<ContributorId>,
		status_: ContributionStatus,
	) -> Result<(), ContributionProjectionRepositoryError> {
		let connection = self.connection().map_err(ContributionProjectionRepositoryError::from)?;

		diesel::update(dsl::contributions)
			.filter(dsl::id.eq(contribution_id.to_string()))
			.set((
				dsl::status.eq(status_.to_string()),
				dsl::contributor_id.eq(contributor_id_.map(|value| value.to_string())),
			))
			.execute(&*connection)
			.map_err(DatabaseError::from)?;

		Ok(())
	}

	fn update_status(
		&self,
		contribution_id: &ContributionId,
		status_: ContributionStatus,
	) -> Result<(), ContributionProjectionRepositoryError> {
		let connection = self.connection().map_err(ContributionProjectionRepositoryError::from)?;

		diesel::update(dsl::contributions)
			.filter(dsl::id.eq(contribution_id.to_string()))
			.set((dsl::status.eq(status_.to_string()),))
			.execute(&*connection)
			.map_err(DatabaseError::from)?;

		Ok(())
	}

	fn update_gate(
		&self,
		contribution_id: ContributionId,
		gate: u8,
	) -> Result<(), ContributionProjectionRepositoryError> {
		let connection = self.connection().map_err(ContributionProjectionRepositoryError::from)?;

		diesel::update(dsl::contributions)
			.filter(dsl::id.eq(contribution_id.to_string()))
			.set(dsl::gate.eq(gate as i32))
			.execute(&*connection)
			.map_err(DatabaseError::from)?;

		Ok(())
	}

	fn list_by_project(
		&self,
		project_id: &GithubProjectId,
	) -> Result<Vec<ContributionProjection>, ContributionProjectionRepositoryError> {
		let connection = self.connection().map_err(ContributionProjectionRepositoryError::from)?;

		let contributions = dsl::contributions
			.filter(dsl::project_id.eq(project_id.to_string()))
			.load::<models::Contribution>(&*connection)
			.map_err(DatabaseError::from)?;

		Ok(contributions.into_iter().map_into().collect())
	}
}

impl ProjectionRepository<ContributionProjection> for Client {
	fn clear(&self) -> Result<(), ProjectionRepositoryError> {
		self.clear_table(dsl::contributions)
			.map_err(|e| ProjectionRepositoryError::Infrastructure(e.into()))
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
