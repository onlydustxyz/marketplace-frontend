use std::sync::Arc;

use async_trait::async_trait;
use mapinto::ResultMapErrInto;

use marketplace_domain::{Error as DomainError, *};

#[async_trait]
pub trait Usecase: Send + Sync {
	async fn accept_application(
		&self,
		contribution_id: &ContributionId,
		contributor_id: &ContributorId,
	) -> Result<HexPrefixedString, DomainError>;
}

pub struct AcceptApplication {
	onchain_contribution_service: Arc<dyn OnchainContributionService>,
	contribution_projection_repository: Arc<dyn ContributionProjectionRepository>,
	application_repository: Arc<dyn ApplicationProjectionRepository>,
}

impl AcceptApplication {
	pub fn new(
		onchain_contribution_service: Arc<dyn OnchainContributionService>,
		contribution_projection_repository: Arc<dyn ContributionProjectionRepository>,
		application_repository: Arc<dyn ApplicationProjectionRepository>,
	) -> Self {
		Self {
			onchain_contribution_service,
			contribution_projection_repository,
			application_repository,
		}
	}
}

impl AcceptApplication {
	pub fn new_usecase_boxed(
		onchain_contribution_service: Arc<dyn OnchainContributionService>,
		contribution_projection_repository: Arc<dyn ContributionProjectionRepository>,
		application_repository: Arc<dyn ApplicationProjectionRepository>,
	) -> Box<dyn Usecase> {
		Box::new(Self {
			onchain_contribution_service,
			contribution_projection_repository,
			application_repository,
		})
	}
}

#[async_trait]
impl Usecase for AcceptApplication {
	async fn accept_application(
		&self,
		contribution_id: &ContributionId,
		contributor_id: &ContributorId,
	) -> Result<HexPrefixedString, DomainError> {
		let application = self
			.application_repository
			.find(contribution_id, contributor_id)
			.map_err(DomainError::from)?
			.ok_or_else(|| DomainError::from(ApplicationProjectionRepositoryError::NotFound))?;

		// TODO: use contribution aggregate root instead of projection as source of truth
		let contribution = self
			.contribution_projection_repository
			.find_by_id(application.contribution_id())
			.map_err(DomainError::from)?
			.ok_or_else(|| DomainError::from(ContributionProjectionRepositoryError::NotFound))?;

		self.onchain_contribution_service
			.assign_contributor(contribution.id, application.contributor_id().to_owned())
			.await
			.map_err_into()
	}
}

#[cfg(test)]
mod test {
	use std::str::FromStr;

	use super::*;
	use chrono::{NaiveDate, NaiveDateTime};
	use futures::FutureExt;
	use mockall::predicate::eq;
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

	#[fixture]
	fn application_repository() -> MockApplicationProjectionRepository {
		MockApplicationProjectionRepository::new()
	}

	#[fixture]
	fn contribution_id() -> ContributionId {
		1.into()
	}

	#[fixture]
	fn now() -> NaiveDateTime {
		NaiveDate::from_ymd(2022, 9, 16).and_hms(14, 37, 11)
	}

	#[rstest]
	#[tokio::test]
	async fn accept_application_success(
		mut onchain_contribution_service: MockOnchainContributionService,
		mut contribution_projection_repository: MockContributionProjectionRepository,
		mut application_repository: MockApplicationProjectionRepository,
		contribution_id: ContributionId,
		now: NaiveDateTime,
	) {
		application_repository.expect_find().returning(move |_, _| {
			Ok(Some(ApplicationProjection::new(
				ContributionId::default(),
				ContributorId::from(42),
				now,
			)))
		});

		let cloned_contribution_id = contribution_id.clone();
		contribution_projection_repository.expect_find_by_id().returning(move |_| {
			Ok(Some(ContributionProjection {
				id: cloned_contribution_id.clone(),
				..Default::default()
			}))
		});

		onchain_contribution_service
			.expect_assign_contributor()
			.with(eq(contribution_id.clone()), eq(ContributorId::from(42)))
			.returning(|_, _| async { Ok(HexPrefixedString::default()) }.boxed());

		let usecase = AcceptApplication::new_usecase_boxed(
			Arc::new(onchain_contribution_service),
			Arc::new(contribution_projection_repository),
			Arc::new(application_repository),
		);

		let result = usecase.accept_application(&contribution_id, &ContributorId::from(42)).await;
		assert!(result.is_ok(), "{}", result.err().unwrap());
	}

	#[rstest]
	#[tokio::test]
	async fn accept_application_application_not_found(
		onchain_contribution_service: MockOnchainContributionService,
		contribution_projection_repository: MockContributionProjectionRepository,
		mut application_repository: MockApplicationProjectionRepository,
	) {
		application_repository.expect_find().returning(|_, _| Ok(None));

		let usecase = AcceptApplication::new_usecase_boxed(
			Arc::new(onchain_contribution_service),
			Arc::new(contribution_projection_repository),
			Arc::new(application_repository),
		);

		let result = usecase
			.accept_application(
				&ContributionId::from_str("0x01").unwrap(),
				&ContributorId::from_str("0x01").unwrap(),
			)
			.await;
		assert!(result.is_err());
		assert_eq!(
			"Application repository error",
			result.unwrap_err().to_string()
		);
	}

	#[rstest]
	#[tokio::test]
	async fn accept_application_contribution_not_found(
		onchain_contribution_service: MockOnchainContributionService,
		mut contribution_projection_repository: MockContributionProjectionRepository,
		mut application_repository: MockApplicationProjectionRepository,
		now: NaiveDateTime,
	) {
		application_repository.expect_find().returning(move |_, _| {
			Ok(Some(ApplicationProjection::new(
				ContributionId::default(),
				ContributorId::from(42),
				now,
			)))
		});

		contribution_projection_repository.expect_find_by_id().returning(|_| Ok(None));

		let usecase = AcceptApplication::new_usecase_boxed(
			Arc::new(onchain_contribution_service),
			Arc::new(contribution_projection_repository),
			Arc::new(application_repository),
		);

		let result = usecase
			.accept_application(&ContributionId::default(), &ContributorId::from(42))
			.await;
		assert!(result.is_err());
		assert_eq!(
			"Contribution projection repository error",
			result.unwrap_err().to_string()
		);
	}
}
