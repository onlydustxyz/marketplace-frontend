use crate::{aggregate_root_repository::Repository, *};
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

	fn on_assigned(
		&self,
		contribution_id: &ContributionId,
		contributor_id: &ContributorId,
	) -> Result<(), DomainError>;
}

pub struct ContributionService {
	contribution_repository: Arc<dyn Repository<Contribution>>,
	application_repository: Arc<dyn ApplicationRepository>,
	application_service: Arc<dyn ApplicationService>,
	uuid_generator: Arc<dyn UuidGenerator>,
}

impl ContributionService {
	pub fn new(
		contribution_repository: Arc<dyn Repository<Contribution>>,
		application_repository: Arc<dyn ApplicationRepository>,
		application_service: Arc<dyn ApplicationService>,
		uuid_generator: Arc<dyn UuidGenerator>,
	) -> Self {
		Self {
			application_repository,
			contribution_repository,
			application_service,
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
			.find_by_id(contribution_id.to_owned())
			.map_err(DomainError::from)?;

		if contribution.get_status() != ContributionStatus::Open {
			return Err(Error::CannotApply(contribution.get_status()).into());
		}

		let uuid = self.uuid_generator.new_uuid();

		let application = Application::new(
			uuid.into(),
			contribution_id.to_owned(),
			contributor_id.to_owned(),
		);

		self.application_repository.create(application).map_err_into()
	}

	fn on_assigned(
		&self,
		contribution_id: &ContributionId,
		contributor_id: &ContributorId,
	) -> Result<(), DomainError> {
		// Note that we handle the None case properly as the old way to apply (ie. typeform) didn't
		// create any application.
		match self
			.application_repository
			.list_by_contribution(contribution_id, Some(contributor_id.to_owned()))
			.map_err(DomainError::from)?
			.first()
		{
			Some(application) => self
				.application_service
				.accept_application(application.to_owned())
				.map_err(DomainError::from),
			None => self
				.application_service
				.reject_all_applications(contribution_id)
				.map_err(DomainError::from),
		}
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
	fn contribution_repository() -> MockRepository<Contribution> {
		MockRepository::new()
	}

	#[fixture]
	fn application_repository() -> MockApplicationRepository {
		MockApplicationRepository::new()
	}

	#[fixture]
	fn application_service() -> MockApplicationService {
		MockApplicationService::new()
	}

	#[fixture]
	fn uuid_generator() -> MockUuidGenerator {
		MockUuidGenerator::new()
	}

	#[fixture]
	fn contribution_id() -> ContributionId {
		ContributionId::from_str("0x1234").unwrap()
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
		mut contribution_repository: MockRepository<Contribution>,
		mut application_repository: MockApplicationRepository,
		application_service: MockApplicationService,
		mut uuid_generator: MockUuidGenerator,
		contribution_id: ContributionId,
		contributor_id: ContributorId,
		application_id: ApplicationId,
	) {
		uuid_generator.expect_new_uuid().return_const(application_id);

		let cloned_contribution_id = contribution_id.clone();
		contribution_repository
			.expect_find_by_id()
			.with(eq(cloned_contribution_id.to_owned()))
			.returning(move |_| {
				Ok(Contribution::new_with_id_and_status(
					cloned_contribution_id.clone(),
					ContributionStatus::Open,
				))
			});
		application_repository
			.expect_create()
			.withf(move |application| *application.id() == application_id)
			.returning(move |_| Ok(()));

		let contribution_service = ContributionService {
			contribution_repository: Arc::new(contribution_repository),
			application_repository: Arc::new(application_repository),
			application_service: Arc::new(application_service),
			uuid_generator: Arc::new(uuid_generator),
		};

		let apply_result = contribution_service.apply(&contribution_id, &contributor_id);
		assert!(apply_result.is_ok());
	}

	#[rstest]
	fn contribution_must_be_open(
		mut contribution_repository: MockRepository<Contribution>,
		application_repository: MockApplicationRepository,
		application_service: MockApplicationService,
		uuid_generator: MockUuidGenerator,
		contribution_id: ContributionId,
		contributor_id: ContributorId,
	) {
		let cloned_contribution_id = contribution_id.clone();
		contribution_repository
			.expect_find_by_id()
			.with(eq(contribution_id.clone()))
			.returning(move |_| {
				Ok(Contribution::new_with_id_and_status(
					cloned_contribution_id.clone(),
					ContributionStatus::Completed,
				))
			});

		let contribution_service = ContributionService {
			contribution_repository: Arc::new(contribution_repository),
			application_repository: Arc::new(application_repository),
			application_service: Arc::new(application_service),
			uuid_generator: Arc::new(uuid_generator),
		};

		let apply_result = contribution_service.apply(&contribution_id, &contributor_id);
		assert!(apply_result.is_err());
	}

	#[rstest]
	fn on_assigned_success_application_found(
		contribution_repository: MockRepository<Contribution>,
		mut application_repository: MockApplicationRepository,
		mut application_service: MockApplicationService,
		uuid_generator: MockUuidGenerator,
	) {
		let contribution_id = ContributionId::from(100);
		let contributor_id = ContributorId::from(42);

		let contribution = ContributionProjection {
			id: contribution_id.clone(),
			status: ContributionStatus::Open,
			..Default::default()
		};

		let cloned_contribution_id = contribution_id.clone();
		application_repository
			.expect_list_by_contribution()
			.with(eq(contribution.id), eq(Some(contributor_id.to_owned())))
			.returning(move |_, _| {
				Ok(vec![Application::new(
					ApplicationId::default(),
					cloned_contribution_id.clone(),
					ContributorId::from(42),
				)])
			});

		application_service.expect_accept_application().returning(|_| Ok(()));

		let contribution_service = ContributionService {
			contribution_repository: Arc::new(contribution_repository),
			application_repository: Arc::new(application_repository),
			application_service: Arc::new(application_service),
			uuid_generator: Arc::new(uuid_generator),
		};

		let result = contribution_service.on_assigned(&contribution_id, &contributor_id);
		assert!(result.is_ok(), "{:?}", result.err().unwrap());
	}

	#[rstest]
	fn on_assigned_success_application_not_found(
		contribution_repository: MockRepository<Contribution>,
		mut application_repository: MockApplicationRepository,
		mut application_service: MockApplicationService,
		uuid_generator: MockUuidGenerator,
	) {
		let contribution_id = ContributionId::from(100);
		let contributor_id = ContributorId::from(42);

		application_repository
			.expect_list_by_contribution()
			.returning(|_, _| Ok(vec![]));

		application_service.expect_reject_all_applications().returning(|_| Ok(()));

		let contribution_service = ContributionService {
			contribution_repository: Arc::new(contribution_repository),
			application_repository: Arc::new(application_repository),
			application_service: Arc::new(application_service),
			uuid_generator: Arc::new(uuid_generator),
		};

		let result = contribution_service.on_assigned(&contribution_id, &contributor_id);
		assert!(result.is_ok(), "{:?}", result.err().unwrap());
	}
}
