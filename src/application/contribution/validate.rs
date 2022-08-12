use crate::domain::*;
use mapinto::ResultMapErrInto;
use mockall::automock;
use std::sync::Arc;

#[automock]
// Usecase must be `Send` and `Sync` as it is managed in a rocket State<T> that requires T to be
// `Send` and `Sync`
pub trait Usecase: Send + Sync {
	fn send_validate_request(&self, contribution_id: &ContributionId) -> Result<(), DomainError>;
}

pub struct ValidateContribution {
	onchain_contribution_service: Arc<dyn OnchainContributionService>,
	contribution_repository: Arc<dyn ContributionRepository>,
}

impl ValidateContribution {
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

impl Usecase for ValidateContribution {
	fn send_validate_request(&self, contribution_id: &ContributionId) -> Result<(), DomainError> {
		match self.contribution_repository.find_by_id(contribution_id)? {
			Some(contribution) => self
				.onchain_contribution_service
				.validate(contribution.onchain_id)
				.map_err_into(),
			None => Err(ContributionRepositoryError::NotFound.into()),
		}
	}
}

#[cfg(test)]
mod test {
	use super::*;
	use mockall::predicate::*;
	use rstest::*;
	use starknet::core::types::FieldElement;
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
	fn validate_contribution_success(
		mut onchain_contribution_service: MockOnchainContributionService,
		mut contribution_repository: MockContributionRepository,
	) {
		let contribution_id = Uuid::from_u128(12).into();
		contribution_repository.expect_find_by_id().returning(|_| {
			Ok(Some(Contribution {
				id: Uuid::from_u128(12).into(),
				onchain_id: String::from("22"),
				project_id: String::from("34"),
				contributor_id: None,
				title: None,
				description: None,
				status: ContributionStatus::Open,
				external_link: None,
				gate: 0,
				metadata: ContributionMetadata {
					difficulty: None,
					technology: None,
					duration: None,
					context: None,
					r#type: None,
				},
				validator: FieldElement::ZERO,
			}))
		});

		onchain_contribution_service
			.expect_validate()
			.with(eq(String::from("22")))
			.returning(|_| Ok(()));

		let usecase = ValidateContribution::new_usecase_boxed(
			Arc::new(onchain_contribution_service),
			Arc::new(contribution_repository),
		);

		let result = usecase.send_validate_request(&contribution_id);
		assert!(result.is_ok(), "{:?}", result.err().unwrap());
	}

	#[rstest]
	fn validate_contribution_find_error(
		onchain_contribution_service: MockOnchainContributionService,
		mut contribution_repository: MockContributionRepository,
	) {
		contribution_repository
			.expect_find_by_id()
			.returning(|_| Err(ContributionRepositoryError::InvalidEntity(Box::new(Error))));

		let usecase = ValidateContribution::new_usecase_boxed(
			Arc::new(onchain_contribution_service),
			Arc::new(contribution_repository),
		);

		let result = usecase.send_validate_request(&Uuid::from_u128(12).into());

		assert!(result.is_err());
		assert_eq!(
			"Contribution repository error",
			result.unwrap_err().to_string()
		);
	}

	#[rstest]
	fn validate_contribution_not_found(
		onchain_contribution_service: MockOnchainContributionService,
		mut contribution_repository: MockContributionRepository,
	) {
		contribution_repository.expect_find_by_id().returning(|_| Ok(None));

		let usecase = ValidateContribution::new_usecase_boxed(
			Arc::new(onchain_contribution_service),
			Arc::new(contribution_repository),
		);

		let result = usecase.send_validate_request(&Uuid::from_u128(12).into());

		assert!(result.is_err());
		assert_eq!(
			"Contribution repository error",
			result.unwrap_err().to_string()
		);
	}

	#[rstest]
	fn validate_contribution_send_error(
		mut onchain_contribution_service: MockOnchainContributionService,
		mut contribution_repository: MockContributionRepository,
	) {
		let contribution_id = Uuid::from_u128(12).into();
		contribution_repository.expect_find_by_id().returning(|_| {
			Ok(Some(Contribution {
				id: Uuid::from_u128(12).into(),
				onchain_id: String::from("22"),
				project_id: String::from("34"),
				contributor_id: None,
				title: None,
				description: None,
				status: ContributionStatus::Open,
				external_link: None,
				gate: 0,
				metadata: ContributionMetadata {
					difficulty: None,
					technology: None,
					duration: None,
					context: None,
					r#type: None,
				},
				validator: FieldElement::ZERO,
			}))
		});

		onchain_contribution_service
			.expect_validate()
			.with(eq(String::from("22")))
			.returning(|_| {
				Err(OnchainContributionServiceError::Infrastructure(Box::new(
					Error,
				)))
			});

		let usecase = ValidateContribution::new_usecase_boxed(
			Arc::new(onchain_contribution_service),
			Arc::new(contribution_repository),
		);

		let result = usecase.send_validate_request(&contribution_id);

		assert!(result.is_err());
		assert_eq!(
			"Onchain contribution service error",
			result.unwrap_err().to_string()
		);
	}
}
