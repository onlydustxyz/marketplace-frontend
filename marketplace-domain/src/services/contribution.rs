use crate::*;
use async_trait::async_trait;
use log::error;
use mapinto::ResultMapErrInto;
use mockall::automock;
use std::sync::Arc;
use thiserror::Error;

#[derive(Debug, Error)]
pub enum Error {
	#[error(
		"The current contribution status, `{0}`, does not allow it to recieve new applications"
	)]
	CannotApply(ContributionStatus),
}

#[automock]
#[async_trait]
pub trait Service: Send + Sync {
	fn apply(
		&self,
		contribution_id: &ContributionId,
		contributor_id: &ContributorId,
	) -> Result<(), DomainError>;
}

pub struct ContributionService {
	contribution_repository: Arc<dyn ContributionRepository>,
	application_repository: Arc<dyn ApplicationRepository>,
	uuid_generator: Arc<dyn UuidGenerator>,
}

impl ContributionService {
	pub fn new(
		contribution_repository: Arc<dyn ContributionRepository>,
		application_repository: Arc<dyn ApplicationRepository>,
		uuid_generator: Arc<dyn UuidGenerator>,
	) -> Self {
		Self {
			application_repository,
			contribution_repository,
			uuid_generator,
		}
	}
}

#[async_trait]
impl Service for ContributionService {
	fn apply(
		&self,
		contribution_id: &ContributionId,
		contributor_id: &ContributorId,
	) -> Result<(), DomainError> {
		let contribution = self
			.contribution_repository
			.find_by_id(contribution_id)
			.map_err(DomainError::from)?
			.ok_or_else(|| DomainError::from(ContributionRepositoryError::NotFound))?;

		if contribution.status != ContributionStatus::Open {
			return Err(Error::CannotApply(contribution.status).into());
		}

		let uuid = self.uuid_generator.new_uuid();

		let application = Application::new(
			uuid.into(),
			*contribution_id,
			contributor_id.clone(),
			ApplicationStatus::Pending,
		);

		self.application_repository.create(application).map_err_into()
	}
}

#[cfg(test)]
mod test {
	use super::*;
	use mockall::predicate::eq;
	use rstest::*;
	use std::str::FromStr;
	use uuid::Uuid;

	#[fixture]
	fn contribution_repository() -> MockContributionRepository {
		MockContributionRepository::new()
	}

	#[fixture]
	fn application_repository() -> MockApplicationRepository {
		MockApplicationRepository::new()
	}

	#[fixture]
	fn uuid_generator() -> MockUuidGenerator {
		MockUuidGenerator::new()
	}

	#[fixture]
	fn contribution_id() -> ContributionId {
		Uuid::from_str("c5ac070d-3478-4973-be8e-756aada6bcf8").unwrap().into()
	}

	#[fixture]
	fn contributor_id() -> ContributorId {
		123.into()
	}

	#[fixture]
	fn application_id() -> ApplicationId {
		Uuid::new_v4().into()
	}

	#[rstest]
	fn application_success(
		mut contribution_repository: MockContributionRepository,
		mut application_repository: MockApplicationRepository,
		mut uuid_generator: MockUuidGenerator,
		contribution_id: ContributionId,
		contributor_id: ContributorId,
		application_id: ApplicationId,
	) {
		uuid_generator.expect_new_uuid().return_const(application_id);
		contribution_repository.expect_find_by_id().with(eq(contribution_id)).returning(
			move |_| {
				Ok(Some(Contribution {
					id: contribution_id,
					status: ContributionStatus::Open,
					..Default::default()
				}))
			},
		);
		application_repository
			.expect_create()
			.withf(move |application| *application.id() == application_id)
			.returning(move |_| Ok(()));

		let contribution_service = ContributionService {
			contribution_repository: Arc::new(contribution_repository),
			application_repository: Arc::new(application_repository),
			uuid_generator: Arc::new(uuid_generator),
		};

		let apply_result = contribution_service.apply(&contribution_id, &contributor_id);
		assert!(apply_result.is_ok());
	}

	#[rstest]
	fn contribution_must_be_open(
		mut contribution_repository: MockContributionRepository,
		application_repository: MockApplicationRepository,
		uuid_generator: MockUuidGenerator,
		contribution_id: ContributionId,
		contributor_id: ContributorId,
	) {
		contribution_repository.expect_find_by_id().with(eq(contribution_id)).returning(
			move |_| {
				Ok(Some(Contribution {
					id: contribution_id,
					status: ContributionStatus::Completed,
					..Default::default()
				}))
			},
		);

		let contribution_service = ContributionService {
			contribution_repository: Arc::new(contribution_repository),
			application_repository: Arc::new(application_repository),
			uuid_generator: Arc::new(uuid_generator),
		};

		let apply_result = contribution_service.apply(&contribution_id, &contributor_id);
		assert!(apply_result.is_err());
	}
}
