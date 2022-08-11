use diesel::{BoolExpressionMethods, Connection, ExpressionMethods, QueryDsl, RunQueryDsl};
use mapinto::{ResultMapErrInto, ResultMapInto};

use crate::{
	domain::*,
	infrastructure::database::{
		models::{self, Status},
		schema::{applications, contributions},
		Client,
	},
};

impl ApplicationService for Client {
	fn accept_application(
		&self,
		id: &ApplicationId,
	) -> Result<Application, ApplicationServiceError> {
		let connection = self
			.connection()
			.map_err(|e| ApplicationServiceError::Infrastructure(Box::new(e)))?;

		let application: Application = applications::dsl::applications
			.find(id.as_uuid())
			.first::<models::Application>(&*connection)
			.map_into()?;

		if *application.status() != ApplicationStatus::Pending {
			return Err(ApplicationServiceError::InvalidApplicationStatus {
				current: *application.status(),
				required: ApplicationStatus::Pending,
			});
		}

		let res: Result<models::Application, diesel::result::Error> =
			connection.transaction(|| {
				// Set the chosen one to accepted
				let application = diesel::update(
					applications::dsl::applications.filter(applications::id.eq(id.as_uuid())),
				)
				.set(applications::status.eq(Status::Accepted))
				.get_result::<models::Application>(&*connection)?;

				// Set all other applications to refused
				diesel::update(
					applications::dsl::applications.filter(
						applications::contribution_id
							.eq(application.contribution_id)
							.and(applications::id.ne(id.as_uuid())),
					),
				)
				.set(applications::status.eq(Status::Refused))
				.execute(&*connection)?;

				Ok(application)
			});

		res.map_into().map_err_into()
	}

	fn apply(
		&self,
		id: ApplicationId,
		contribution_id: ContributionId,
		contributor_id: ContributorId,
	) -> Result<(), ApplicationServiceError> {
		let connection = self
			.connection()
			.map_err(|e| ApplicationServiceError::Infrastructure(Box::new(e)))?;

		let contribution: Contribution = contributions::dsl::contributions
			.find(contribution_id.as_uuid())
			.first::<models::Contribution>(&*connection)
			.map_into()?;

		if contribution.status != ContributionStatus::Open {
			return Err(ApplicationServiceError::InvalidContributionStatus {
				required: ContributionStatus::Open,
				current: contribution.status,
			});
		}

		let application = models::NewApplication {
			id: *id.as_uuid(),
			contribution_id: *contribution_id.as_uuid(),
			contributor_id: contributor_id.to_string(),
			status: Status::Pending,
		};

		diesel::insert_into(applications::table)
			.values(&application)
			.execute(&*connection)
			.map_err(ApplicationServiceError::from)?;

		Ok(())
	}
}

impl From<diesel::result::Error> for ApplicationServiceError {
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
