use crate::{
	domain::*,
	infrastructure::database::{models, schema, schema::contributions, Client, DatabaseError},
};
use diesel::prelude::*;
use uuid::Uuid;

impl ContributionRepository for Client {
	fn find_by_id(
		&self,
		contribution_id: &ContributionId,
	) -> Result<Option<Contribution>, ContributionRepositoryError> {
		let connection = self
			.connection()
			.map_err(|e| ContributionRepositoryError::Infrastructure(e.into()))?;

		match contributions::table
			.find(contribution_id.as_uuid())
			.get_result::<models::Contribution>(&*connection)
		{
			Ok(contribution) => Ok(Some(contribution.into())),
			Err(diesel::NotFound) => Ok(None),
			Err(e) => Err(ContributionRepositoryError::Infrastructure(e.into())),
		}
	}

	fn create(
		&self,
		contribution: Contribution,
		transaction_hash: String,
	) -> Result<(), ContributionRepositoryError> {
		let connection = self
			.connection()
			.map_err(|e| ContributionRepositoryError::Infrastructure(e.into()))?;

		let contribution = models::Contribution::from((contribution, transaction_hash));
		diesel::insert_into(contributions::table)
			.values(&contribution)
			.execute(&*connection)
			.map_err(ContributionRepositoryError::from)?;

		Ok(())
	}

	fn update(&self, contribution: Contribution) -> Result<(), ContributionRepositoryError> {
		let connection = self
			.connection()
			.map_err(|e| ContributionRepositoryError::Infrastructure(e.into()))?;
		let contribution_id: Uuid = contribution.id.into();
		let contribution_update: models::ContributionUpdate = contribution.into();
		diesel::update(contributions::table.filter(contributions::id.eq(contribution_id)))
			.set(contribution_update)
			.execute(&*connection)
			.map_err(ContributionRepositoryError::from)?;
		Ok(())
	}

	fn update_contributor_and_status(
		&self,
		contribution_id: ContributionOnChainId,
		contributor_id_: Option<ContributorId>,
		status_: ContributionStatus,
		transaction_hash_: String,
	) -> Result<(), ContributionRepositoryError> {
		let connection = self.connection().map_err(ContributionRepositoryError::from)?;

		diesel::update(schema::contributions::dsl::contributions)
			.filter(contributions::onchain_id.eq(contribution_id))
			.set((
				schema::contributions::status.eq(status_.to_string()),
				schema::contributions::contributor_id.eq(match contributor_id_ {
					Some(id_) => id_.to_string(),
					None => String::new(),
				}),
				schema::contributions::transaction_hash.eq(transaction_hash_),
			))
			.execute(&*connection)
			.map_err(ContributionRepositoryError::from)?;

		Ok(())
	}

	fn update_status(
		&self,
		contribution_id: ContributionOnChainId,
		status_: ContributionStatus,
		transaction_hash_: String,
	) -> Result<(), ContributionRepositoryError> {
		let connection = self.connection().map_err(ContributionRepositoryError::from)?;

		diesel::update(schema::contributions::dsl::contributions)
			.filter(contributions::onchain_id.eq(contribution_id))
			.set((
				schema::contributions::status.eq(status_.to_string()),
				schema::contributions::transaction_hash.eq(transaction_hash_),
			))
			.execute(&*connection)
			.map_err(ContributionRepositoryError::from)?;

		Ok(())
	}
}

impl From<(Contribution, String)> for models::Contribution {
	fn from((contribution, transaction_hash): (Contribution, String)) -> Self {
		Self {
			id: contribution.id.into(),
			onchain_id: contribution.onchain_id,
			project_id: contribution.project_id,
			status: contribution.status.to_string(),
			contributor_id: contribution.contributor_id.map_or(String::new(), |id| id.to_string()),
			gate: contribution.gate as i16,
			transaction_hash: transaction_hash.into(),
			title: contribution.title,
			description: contribution.description,
			external_link: contribution.external_link.map(|link| link.to_string()),
			difficulty: contribution.metadata.difficulty,
			technology: contribution.metadata.technology,
			duration: contribution.metadata.duration,
			context: contribution.metadata.context,
			type_: contribution.metadata.r#type,
			validator: format!("{:#x}", contribution.validator),
		}
	}
}

impl From<Contribution> for models::ContributionUpdate {
	fn from(contribution: Contribution) -> Self {
		Self {
			id: contribution.id.into(),
			onchain_id: contribution.onchain_id,
			project_id: contribution.project_id,
			status: contribution.status.to_string(),
			contributor_id: contribution.contributor_id.map_or(String::new(), |id| id.to_string()),
			gate: contribution.gate as i16,
			title: contribution.title,
			description: contribution.description,
			external_link: contribution.external_link.map(|link| link.to_string()),
			difficulty: contribution.metadata.difficulty,
			technology: contribution.metadata.technology,
			duration: contribution.metadata.duration,
			context: contribution.metadata.context,
			type_: contribution.metadata.r#type,
			validator: format!("{:#x}", contribution.validator),
		}
	}
}

impl From<DatabaseError> for ContributionRepositoryError {
	fn from(error: DatabaseError) -> Self {
		Self::Infrastructure(Box::new(error))
	}
}

impl From<diesel::result::Error> for ContributionRepositoryError {
	fn from(error: diesel::result::Error) -> Self {
		match error {
			diesel::result::Error::DatabaseError(kind, _) => match kind {
				diesel::result::DatabaseErrorKind::UniqueViolation =>
					Self::AlreadyExist(Box::new(error)),
				diesel::result::DatabaseErrorKind::ForeignKeyViolation =>
					Self::InvalidEntity(Box::new(error)),
				_ => Self::Infrastructure(Box::new(error)),
			},
			diesel::result::Error::NotFound => Self::NotFound,
			_ => Self::Infrastructure(Box::new(error)),
		}
	}
}
