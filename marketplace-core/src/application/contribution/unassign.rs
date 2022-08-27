use async_trait::async_trait;
use mapinto::ResultMapErrInto;
use marketplace_domain::{Error as DomainError, *};
use mockall::automock;
use std::sync::Arc;

#[automock]
#[async_trait]
// Usecase must be `Send` and `Sync` as it is managed in a rocket State<T> that requires T to be
// `Send` and `Sync`
pub trait Usecase: Send + Sync {
	async fn send_unassign_request(
		&self,
		contribution_id: &ContributionId,
	) -> Result<HexPrefixedString, DomainError>;
}

pub struct UnassignContribution {
	onchain_contribution_service: Arc<dyn OnchainContributionService>,
	contribution_repository: Arc<dyn ContributionRepository>,
}

impl UnassignContribution {
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

#[async_trait]
impl Usecase for UnassignContribution {
	async fn send_unassign_request(
		&self,
		contribution_id: &ContributionId,
	) -> Result<HexPrefixedString, DomainError> {
		let contribution = self.contribution_repository.find_by_id(contribution_id)?;

		match contribution {
			Some(contribution) => self
				.onchain_contribution_service
				.unassign_contributor(contribution.id)
				.await
				.map_err_into(),
			None => Err(ContributionRepositoryError::NotFound.into()),
		}
	}
}

#[cfg(test)]
mod test {
	use super::*;
	use futures::FutureExt;
	use rstest::*;
	use thiserror::Error;

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
	#[tokio::test]
	async fn unassign_contribution_success(
		mut onchain_contribution_service: MockOnchainContributionService,
		mut contribution_repository: MockContributionRepository,
	) {
		let contribution_id = 12.into();
		contribution_repository
			.expect_find_by_id()
			.returning(|_| Ok(Some(ContributionProjection::default())));

		onchain_contribution_service
			.expect_unassign_contributor()
			.returning(|_| async { Ok(HexPrefixedString::default()) }.boxed());

		let usecase = UnassignContribution::new_usecase_boxed(
			Arc::new(onchain_contribution_service),
			Arc::new(contribution_repository),
		);

		let result = usecase.send_unassign_request(&contribution_id).await;
		assert!(result.is_ok(), "{:?}", result.err().unwrap());
	}

	#[rstest]
	#[tokio::test]
	async fn unassign_contribution_find_error(
		onchain_contribution_service: MockOnchainContributionService,
		mut contribution_repository: MockContributionRepository,
	) {
		contribution_repository
			.expect_find_by_id()
			.returning(|_| Err(ContributionRepositoryError::InvalidEntity(Box::new(Error))));

		let usecase = UnassignContribution::new_usecase_boxed(
			Arc::new(onchain_contribution_service),
			Arc::new(contribution_repository),
		);

		let result = usecase.send_unassign_request(&12.into()).await;

		assert!(result.is_err());
		assert_eq!(
			"Contribution repository error",
			result.unwrap_err().to_string()
		);
	}

	#[rstest]
	#[tokio::test]
	async fn unassign_contribution_not_found(
		onchain_contribution_service: MockOnchainContributionService,
		mut contribution_repository: MockContributionRepository,
	) {
		contribution_repository.expect_find_by_id().returning(|_| Ok(None));

		let usecase = UnassignContribution::new_usecase_boxed(
			Arc::new(onchain_contribution_service),
			Arc::new(contribution_repository),
		);

		let result = usecase.send_unassign_request(&12.into()).await;

		assert!(result.is_err());
		assert_eq!(
			"Contribution repository error",
			result.unwrap_err().to_string()
		);
	}

	#[rstest]
	#[tokio::test]
	async fn unassign_contribution_send_error(
		mut onchain_contribution_service: MockOnchainContributionService,
		mut contribution_repository: MockContributionRepository,
	) {
		let contribution_id = 12.into();
		contribution_repository
			.expect_find_by_id()
			.returning(|_| Ok(Some(ContributionProjection::default())));

		onchain_contribution_service.expect_unassign_contributor().returning(|_| {
			async {
				Err(OnchainContributionServiceError::Infrastructure(Box::new(
					Error,
				)))
			}
			.boxed()
		});

		let usecase = UnassignContribution::new_usecase_boxed(
			Arc::new(onchain_contribution_service),
			Arc::new(contribution_repository),
		);

		let result = usecase.send_unassign_request(&contribution_id).await;

		assert!(result.is_err());
		assert_eq!(
			"Onchain contribution service error",
			result.unwrap_err().to_string()
		);
	}
}
