use std::sync::Arc;

use marketplace_domain::{Error as DomainError, *};

pub trait Usecase: Send + Sync {
	fn on_assigned(
		&self,
		contribution_onchain_id: ContributionOnChainId,
		contributor_id: &ContributorId,
	) -> Result<(), DomainError>;
}

pub struct OnContributionAssigned {
	contribution_repository: Arc<dyn ContributionRepository>,
	application_repository: Arc<dyn ApplicationRepository>,
	application_service: Arc<dyn ApplicationService>,
}

impl OnContributionAssigned {
	pub fn new(
		contribution_repository: Arc<dyn ContributionRepository>,
		application_repository: Arc<dyn ApplicationRepository>,
		application_service: Arc<dyn ApplicationService>,
	) -> Self {
		Self {
			contribution_repository,
			application_repository,
			application_service,
		}
	}
}

impl OnContributionAssigned {
	pub fn new_usecase_boxed(
		contribution_repository: Arc<dyn ContributionRepository>,
		application_repository: Arc<dyn ApplicationRepository>,
		application_service: Arc<dyn ApplicationService>,
	) -> Box<dyn Usecase> {
		Box::new(Self {
			contribution_repository,
			application_repository,
			application_service,
		})
	}
}

impl Usecase for OnContributionAssigned {
	fn on_assigned(
		&self,
		contribution_onchain_id: ContributionOnChainId,
		contributor_id: &ContributorId,
	) -> Result<(), DomainError> {
		let mut contribution = self
			.contribution_repository
			.find_by_onchain_id(&contribution_onchain_id)
			.map_err(DomainError::from)?
			.ok_or_else(|| DomainError::from(ContributionRepositoryError::NotFound))?;

		let contribution_id = contribution.id;
		contribution.status = ContributionStatus::Assigned;
		contribution.contributor_id = Some(contributor_id.to_owned());
		self.contribution_repository.update(contribution).map_err(DomainError::from)?;

		// Note that we handle the None case properly as the old way to apply (ie. typeform) didn't
		// create any application.
		match self
			.application_repository
			.list_by_contribution(&contribution_id, Some(contributor_id.to_owned()))
			.map_err(DomainError::from)?
			.first()
		{
			Some(application) => self
				.application_service
				.accept_application(application.to_owned())
				.map_err(DomainError::from),
			None => self
				.application_service
				.reject_all_applications(&contribution_id)
				.map_err(DomainError::from),
		}
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
	fn application_service() -> MockApplicationService {
		MockApplicationService::new()
	}

	#[fixture]
	fn contribution_repository() -> MockContributionRepository {
		MockContributionRepository::new()
	}

	#[fixture]
	fn application_repository() -> MockApplicationRepository {
		MockApplicationRepository::new()
	}

	#[rstest]
	fn on_assigned_success_application_found(
		mut application_service: MockApplicationService,
		mut contribution_repository: MockContributionRepository,
		mut application_repository: MockApplicationRepository,
	) {
		let contribution_onchain_id: ContributionOnChainId = "100".to_string();
		let contributor_id = ContributorId::from(42);

		let contribution = Contribution {
			id: ContributionId::from(Uuid::new_v4()),
			status: ContributionStatus::Open,
			..Default::default()
		};
		let mut updated_contribution = contribution.clone();
		updated_contribution.status = ContributionStatus::Assigned;
		updated_contribution.contributor_id = Some(contributor_id.to_owned());

		let returned_contribution = contribution.clone();
		contribution_repository
			.expect_find_by_onchain_id()
			.with(eq(contribution_onchain_id.to_owned()))
			.returning(move |_| Ok(Some(returned_contribution.clone())));
		contribution_repository
			.expect_update()
			.with(eq(updated_contribution))
			.returning(|_| Ok(()));

		application_repository
			.expect_list_by_contribution()
			.with(eq(contribution.id), eq(Some(contributor_id.to_owned())))
			.returning(|_, _| {
				Ok(vec![Application::new(
					ApplicationId::default(),
					ContributionId::default(),
					ContributorId::from(42),
					ApplicationStatus::Pending,
				)])
			});

		application_service.expect_accept_application().returning(|_| Ok(()));

		let usecase = OnContributionAssigned::new_usecase_boxed(
			Arc::new(contribution_repository),
			Arc::new(application_repository),
			Arc::new(application_service),
		);

		let result = usecase.on_assigned(contribution_onchain_id, &contributor_id);
		assert!(result.is_ok(), "{:?}", result.err().unwrap());
	}

	#[rstest]
	fn on_assigned_success_application_not_found(
		mut application_service: MockApplicationService,
		mut contribution_repository: MockContributionRepository,
		mut application_repository: MockApplicationRepository,
	) {
		let contribution_onchain_id: ContributionOnChainId = "100".to_string();
		let contributor_id = ContributorId::from(42);

		let contribution = Contribution {
			id: ContributionId::from(Uuid::new_v4()),
			status: ContributionStatus::Open,
			..Default::default()
		};
		let mut updated_contribution = contribution.clone();
		updated_contribution.status = ContributionStatus::Assigned;
		updated_contribution.contributor_id = Some(contributor_id.to_owned());

		let returned_contribution = contribution.clone();
		contribution_repository
			.expect_find_by_onchain_id()
			.with(eq(contribution_onchain_id.to_owned()))
			.returning(move |_| Ok(Some(returned_contribution.clone())));
		contribution_repository
			.expect_update()
			.with(eq(updated_contribution))
			.returning(|_| Ok(()));

		application_repository
			.expect_list_by_contribution()
			.with(eq(contribution.id), eq(Some(contributor_id.to_owned())))
			.returning(|_, _| Ok(vec![]));

		application_service.expect_reject_all_applications().returning(|_| Ok(()));

		let usecase = OnContributionAssigned::new_usecase_boxed(
			Arc::new(contribution_repository),
			Arc::new(application_repository),
			Arc::new(application_service),
		);

		let result = usecase.on_assigned(contribution_onchain_id, &contributor_id);
		assert!(result.is_ok(), "{:?}", result.err().unwrap());
	}

	#[rstest]
	fn on_assigned_failure_contribution_not_found(
		application_service: MockApplicationService,
		mut contribution_repository: MockContributionRepository,
		application_repository: MockApplicationRepository,
	) {
		let contribution_onchain_id: ContributionOnChainId = "100".to_string();
		let contributor_id = ContributorId::from(42);

		contribution_repository.expect_find_by_onchain_id().returning(move |_| Ok(None));

		let usecase = OnContributionAssigned::new_usecase_boxed(
			Arc::new(contribution_repository),
			Arc::new(application_repository),
			Arc::new(application_service),
		);

		let result = usecase.on_assigned(contribution_onchain_id, &contributor_id);
		assert!(result.is_err());
		assert_eq!(
			"Contribution repository error",
			result.unwrap_err().to_string()
		);
	}
}
