use std::sync::Arc;

use mapinto::ResultMapErrInto;

use marketplace_domain::{Error as DomainError, *};

pub trait Usecase: Send + Sync {
	fn accept_application(
		&self,
		application_id: &ApplicationId,
	) -> Result<HexPrefixedString, DomainError>;
}

pub struct AcceptApplication {
	onchain_contribution_service: Arc<dyn OnchainContributionService>,
	contribution_repository: Arc<dyn ContributionRepository>,
	application_repository: Arc<dyn ApplicationRepository>,
}

impl AcceptApplication {
	pub fn new(
		onchain_contribution_service: Arc<dyn OnchainContributionService>,
		contribution_repository: Arc<dyn ContributionRepository>,
		application_repository: Arc<dyn ApplicationRepository>,
	) -> Self {
		Self {
			onchain_contribution_service,
			contribution_repository,
			application_repository,
		}
	}
}

impl AcceptApplication {
	pub fn new_usecase_boxed(
		onchain_contribution_service: Arc<dyn OnchainContributionService>,
		contribution_repository: Arc<dyn ContributionRepository>,
		application_repository: Arc<dyn ApplicationRepository>,
	) -> Box<dyn Usecase> {
		Box::new(Self {
			onchain_contribution_service,
			contribution_repository,
			application_repository,
		})
	}
}

impl Usecase for AcceptApplication {
	fn accept_application(
		&self,
		application_id: &ApplicationId,
	) -> Result<HexPrefixedString, DomainError> {
		let application = self
			.application_repository
			.find(application_id)
			.map_err(DomainError::from)?
			.ok_or_else(|| DomainError::from(ApplicationRepositoryError::NotFound))?;

		let contribution = self
			.contribution_repository
			.find_by_id(application.contribution_id())
			.map_err(DomainError::from)?
			.ok_or_else(|| DomainError::from(ContributionRepositoryError::NotFound))?;

		self.onchain_contribution_service
			.assign_contributor(
				contribution.onchain_id,
				application.contributor_id().to_owned(),
			)
			.map_err_into()
	}
}

#[cfg(test)]
mod test {
	use super::*;
	use mockall::predicate::eq;
	use rstest::*;
	use thiserror::Error;
	use uuid::Uuid;

	#[derive(Debug, Error)]
	#[error("Oops")]
	struct Error;

	#[fixture]
	fn onchain_contribution_service() -> MockOnchainContributionService {
		MockOnchainContributionService::new()
	}

	#[fixture]
	fn contribution_repository() -> MockContributionRepository {
		MockContributionRepository::new()
	}

	#[fixture]
	fn application_repository() -> MockApplicationRepository {
		MockApplicationRepository::new()
	}

	#[fixture]
	fn onchain_contribution_id() -> ContributionOnChainId {
		"1".to_string()
	}

	#[rstest]
	fn accept_application_success(
		mut onchain_contribution_service: MockOnchainContributionService,
		mut contribution_repository: MockContributionRepository,
		mut application_repository: MockApplicationRepository,
		onchain_contribution_id: ContributionOnChainId,
	) {
		let application_id = Uuid::from_u128(12).into();
		application_repository.expect_find().returning(|_| {
			Ok(Some(Application::new(
				ApplicationId::default(),
				ContributionId::default(),
				ContributorId::from(42),
				ApplicationStatus::Pending,
			)))
		});

		let onchain_id = onchain_contribution_id.clone();
		contribution_repository.expect_find_by_id().returning(move |_| {
			Ok(Some(Contribution {
				onchain_id: onchain_id.clone(),
				..Default::default()
			}))
		});

		onchain_contribution_service
			.expect_assign_contributor()
			.with(eq(onchain_contribution_id), eq(ContributorId::from(42)))
			.returning(|_, _| Ok(HexPrefixedString::default()));

		let usecase = AcceptApplication::new_usecase_boxed(
			Arc::new(onchain_contribution_service),
			Arc::new(contribution_repository),
			Arc::new(application_repository),
		);

		let result = usecase.accept_application(&application_id);
		assert!(result.is_ok(), "{:?}", result.err().unwrap());
	}

	#[rstest]
	fn accept_application_application_not_found(
		onchain_contribution_service: MockOnchainContributionService,
		contribution_repository: MockContributionRepository,
		mut application_repository: MockApplicationRepository,
	) {
		let application_id = Uuid::from_u128(12).into();
		application_repository.expect_find().returning(|_| Ok(None));

		let usecase = AcceptApplication::new_usecase_boxed(
			Arc::new(onchain_contribution_service),
			Arc::new(contribution_repository),
			Arc::new(application_repository),
		);

		let result = usecase.accept_application(&application_id);
		assert!(result.is_err());
		assert_eq!(
			"Application repository error",
			result.unwrap_err().to_string()
		);
	}

	#[rstest]
	fn accept_application_contribution_not_found(
		onchain_contribution_service: MockOnchainContributionService,
		mut contribution_repository: MockContributionRepository,
		mut application_repository: MockApplicationRepository,
	) {
		let application_id = Uuid::from_u128(12).into();
		application_repository.expect_find().returning(|_| {
			Ok(Some(Application::new(
				ApplicationId::default(),
				ContributionId::default(),
				ContributorId::from(42),
				ApplicationStatus::Pending,
			)))
		});

		contribution_repository.expect_find_by_id().returning(|_| Ok(None));

		let usecase = AcceptApplication::new_usecase_boxed(
			Arc::new(onchain_contribution_service),
			Arc::new(contribution_repository),
			Arc::new(application_repository),
		);

		let result = usecase.accept_application(&application_id);
		assert!(result.is_err());
		assert_eq!(
			"Contribution repository error",
			result.unwrap_err().to_string()
		);
	}
}
