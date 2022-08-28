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
	async fn send_assign_request(
		&self,
		contribution_id: &ContributionId,
		contributor_id: &ContributorId,
	) -> Result<HexPrefixedString, DomainError>;
}

#[deprecated(
	since = "0.1.0",
	note = "please use `accept_application` usecase instead"
)]
pub struct AssignContribution {
	onchain_contribution_service: Arc<dyn OnchainContributionService>,
	contribution_projection_repository: Arc<dyn ContributionProjectionRepository>,
}

impl AssignContribution {
	pub fn new_usecase_boxed(
		onchain_contribution_service: Arc<dyn OnchainContributionService>,
		contribution_projection_repository: Arc<dyn ContributionProjectionRepository>,
	) -> Box<dyn Usecase> {
		Box::new(Self {
			onchain_contribution_service,
			contribution_projection_repository,
		})
	}
}

#[async_trait]
impl Usecase for AssignContribution {
	async fn send_assign_request(
		&self,
		contribution_id: &ContributionId,
		contributor_id: &ContributorId,
	) -> Result<HexPrefixedString, DomainError> {
		// TODO: use contribution aggregate root instead of projection as source of truth
		let contribution = self.contribution_projection_repository.find_by_id(contribution_id)?;

		match contribution {
			Some(contribution) => self
				.onchain_contribution_service
				.assign_contributor(contribution.id, contributor_id.to_owned())
				.await
				.map_err_into(),
			None => Err(DomainError::ContributionProjectionRepository(
				ContributionProjectionRepositoryError::NotFound,
			)),
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
	fn contribution_projection_repository() -> MockContributionProjectionRepository {
		MockContributionProjectionRepository::new()
	}

	#[rstest]
	#[tokio::test]
	async fn assign_contribution_success(
		mut onchain_contribution_service: MockOnchainContributionService,
		mut contribution_projection_repository: MockContributionProjectionRepository,
	) {
		let contribution_id = 12.into();
		contribution_projection_repository
			.expect_find_by_id()
			.returning(|_| Ok(Some(ContributionProjection::default())));

		onchain_contribution_service
			.expect_assign_contributor()
			.returning(|_, _| async { Ok(HexPrefixedString::default()) }.boxed());

		let usecase = AssignContribution::new_usecase_boxed(
			Arc::new(onchain_contribution_service),
			Arc::new(contribution_projection_repository),
		);

		let result = usecase.send_assign_request(&contribution_id, &ContributorId::from(34)).await;
		assert!(result.is_ok(), "{:?}", result.err().unwrap());
	}

	#[rstest]
	#[tokio::test]
	async fn assign_contribution_find_error(
		onchain_contribution_service: MockOnchainContributionService,
		mut contribution_projection_repository: MockContributionProjectionRepository,
	) {
		contribution_projection_repository.expect_find_by_id().returning(|_| {
			Err(ContributionProjectionRepositoryError::InvalidEntity(
				Box::new(Error),
			))
		});

		let usecase = AssignContribution::new_usecase_boxed(
			Arc::new(onchain_contribution_service),
			Arc::new(contribution_projection_repository),
		);

		let result = usecase.send_assign_request(&12.into(), &ContributorId::from(34)).await;

		assert!(result.is_err());
		assert_eq!(
			"Contribution projection repository error",
			result.unwrap_err().to_string()
		);
	}

	#[rstest]
	#[tokio::test]
	async fn assign_contribution_not_found(
		onchain_contribution_service: MockOnchainContributionService,
		mut contribution_projection_repository: MockContributionProjectionRepository,
	) {
		contribution_projection_repository.expect_find_by_id().returning(|_| Ok(None));

		let usecase = AssignContribution::new_usecase_boxed(
			Arc::new(onchain_contribution_service),
			Arc::new(contribution_projection_repository),
		);

		let result = usecase.send_assign_request(&12.into(), &ContributorId::from(34)).await;

		assert!(result.is_err());
		assert_eq!(
			"Contribution projection repository error",
			result.unwrap_err().to_string()
		);
	}

	#[rstest]
	#[tokio::test]
	async fn assign_contribution_send_error(
		mut onchain_contribution_service: MockOnchainContributionService,
		mut contribution_projection_repository: MockContributionProjectionRepository,
	) {
		let contribution_id = 12.into();
		contribution_projection_repository
			.expect_find_by_id()
			.returning(|_| Ok(Some(ContributionProjection::default())));

		onchain_contribution_service.expect_assign_contributor().returning(|_, _| {
			async {
				Err(OnchainContributionServiceError::Infrastructure(Box::new(
					Error,
				)))
			}
			.boxed()
		});

		let usecase = AssignContribution::new_usecase_boxed(
			Arc::new(onchain_contribution_service),
			Arc::new(contribution_projection_repository),
		);

		let result = usecase.send_assign_request(&contribution_id, &ContributorId::from(34)).await;

		assert!(result.is_err());
		assert_eq!(
			"Onchain contribution service error",
			result.unwrap_err().to_string()
		);
	}
}
