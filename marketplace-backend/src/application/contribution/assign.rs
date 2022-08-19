use mapinto::ResultMapErrInto;
use mockall::automock;
use onlydust_domain::*;
use std::sync::Arc;

#[automock]
// Usecase must be `Send` and `Sync` as it is managed in a rocket State<T> that requires T to be
// `Send` and `Sync`
pub trait Usecase: Send + Sync {
	fn send_assign_request(
		&self,
		contribution_id: &ContributionId,
		contributor_id: &ContributorId,
	) -> Result<(), DomainError>;
}

pub struct AssignContribution {
	onchain_contribution_service: Arc<dyn OnchainContributionService>,
	contribution_repository: Arc<dyn ContributionRepository>,
}

impl AssignContribution {
	pub fn new_usecase_boxed(
		onchain_contribution_service: Arc<dyn OnchainContributionService>,
		contribution_repository: Arc<dyn ContributionRepository>,
	) -> Box<dyn Usecase> {
		Box::new(Self {
			onchain_contribution_service,
			contribution_repository,
		})
	}
}

impl Usecase for AssignContribution {
	fn send_assign_request(
		&self,
		contribution_id: &ContributionId,
		contributor_id: &ContributorId,
	) -> Result<(), DomainError> {
		match self.contribution_repository.find_by_id(contribution_id)? {
			Some(contribution) => self
				.onchain_contribution_service
				.assign_contributor(contribution.onchain_id, *contributor_id)
				.map_err_into(),
			None => Err(DomainError::ContributionRepository(
				ContributionRepositoryError::NotFound,
			)),
		}
	}
}

#[cfg(test)]
mod test {
	use super::*;
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

	#[rstest]
	fn assign_contribution_success(
		mut onchain_contribution_service: MockOnchainContributionService,
		mut contribution_repository: MockContributionRepository,
	) {
		let contribution_id = Uuid::from_u128(12).into();
		contribution_repository
			.expect_find_by_id()
			.returning(|_| Ok(Some(Contribution::default())));

		onchain_contribution_service
			.expect_assign_contributor()
			.returning(|_, _| Ok(()));

		let usecase = AssignContribution::new_usecase_boxed(
			Arc::new(onchain_contribution_service),
			Arc::new(contribution_repository),
		);

		let result = usecase.send_assign_request(&contribution_id, &ContributorId::from(34));
		assert!(result.is_ok(), "{:?}", result.err().unwrap());
	}

	#[rstest]
	fn assign_contribution_find_error(
		onchain_contribution_service: MockOnchainContributionService,
		mut contribution_repository: MockContributionRepository,
	) {
		contribution_repository
			.expect_find_by_id()
			.returning(|_| Err(ContributionRepositoryError::InvalidEntity(Box::new(Error))));

		let usecase = AssignContribution::new_usecase_boxed(
			Arc::new(onchain_contribution_service),
			Arc::new(contribution_repository),
		);

		let result =
			usecase.send_assign_request(&Uuid::from_u128(12).into(), &ContributorId::from(34));

		assert!(result.is_err());
		assert_eq!(
			"Contribution repository error",
			result.unwrap_err().to_string()
		);
	}

	#[rstest]
	fn assign_contribution_not_found(
		onchain_contribution_service: MockOnchainContributionService,
		mut contribution_repository: MockContributionRepository,
	) {
		contribution_repository.expect_find_by_id().returning(|_| Ok(None));

		let usecase = AssignContribution::new_usecase_boxed(
			Arc::new(onchain_contribution_service),
			Arc::new(contribution_repository),
		);

		let result =
			usecase.send_assign_request(&Uuid::from_u128(12).into(), &ContributorId::from(34));

		assert!(result.is_err());
		assert_eq!(
			"Contribution repository error",
			result.unwrap_err().to_string()
		);
	}

	#[rstest]
	fn assign_contribution_send_error(
		mut onchain_contribution_service: MockOnchainContributionService,
		mut contribution_repository: MockContributionRepository,
	) {
		let contribution_id = Uuid::from_u128(12).into();
		contribution_repository
			.expect_find_by_id()
			.returning(|_| Ok(Some(Contribution::default())));

		onchain_contribution_service.expect_assign_contributor().returning(|_, _| {
			Err(OnchainContributionServiceError::Infrastructure(Box::new(
				Error,
			)))
		});

		let usecase = AssignContribution::new_usecase_boxed(
			Arc::new(onchain_contribution_service),
			Arc::new(contribution_repository),
		);

		let result = usecase.send_assign_request(&contribution_id, &ContributorId::from(34));

		assert!(result.is_err());
		assert_eq!(
			"Onchain contribution service error",
			result.unwrap_err().to_string()
		);
	}
}
