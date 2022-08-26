use std::sync::Arc;

use marketplace_domain::{Error as DomainError, *};

pub trait Usecase: Send + Sync {
	fn on_assigned(
		&self,
		contribution_id: ContributionId,
		contributor_id: &ContributorId,
	) -> Result<(), DomainError>;
}

pub struct OnContributionAssigned {
	application_repository: Arc<dyn ApplicationRepository>,
	application_service: Arc<dyn ApplicationService>,
}

impl OnContributionAssigned {
	pub fn new(
		application_repository: Arc<dyn ApplicationRepository>,
		application_service: Arc<dyn ApplicationService>,
	) -> Self {
		Self {
			application_repository,
			application_service,
		}
	}
}

impl OnContributionAssigned {
	pub fn new_usecase_boxed(
		application_repository: Arc<dyn ApplicationRepository>,
		application_service: Arc<dyn ApplicationService>,
	) -> Box<dyn Usecase> {
		Box::new(Self {
			application_repository,
			application_service,
		})
	}
}

impl Usecase for OnContributionAssigned {
	fn on_assigned(
		&self,
		contribution_id: ContributionId,
		contributor_id: &ContributorId,
	) -> Result<(), DomainError> {
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

	#[derive(Debug, Error)]
	#[error("Oops")]
	struct Error;

	#[fixture]
	fn application_service() -> MockApplicationService {
		MockApplicationService::new()
	}

	#[fixture]
	fn application_repository() -> MockApplicationRepository {
		MockApplicationRepository::new()
	}

	#[rstest]
	fn on_assigned_success_application_found(
		mut application_service: MockApplicationService,
		mut application_repository: MockApplicationRepository,
	) {
		let contribution_id = ContributionId::from(100);
		let contributor_id = ContributorId::from(42);

		let contribution = Contribution {
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
					ApplicationStatus::Pending,
				)])
			});

		application_service.expect_accept_application().returning(|_| Ok(()));

		let usecase = OnContributionAssigned::new_usecase_boxed(
			Arc::new(application_repository),
			Arc::new(application_service),
		);

		let result = usecase.on_assigned(contribution_id, &contributor_id);
		assert!(result.is_ok(), "{:?}", result.err().unwrap());
	}

	#[rstest]
	fn on_assigned_success_application_not_found(
		mut application_service: MockApplicationService,
		mut application_repository: MockApplicationRepository,
	) {
		let contribution_id = ContributionId::from(100);
		let contributor_id = ContributorId::from(42);

		application_repository
			.expect_list_by_contribution()
			.returning(|_, _| Ok(vec![]));

		application_service.expect_reject_all_applications().returning(|_| Ok(()));

		let usecase = OnContributionAssigned::new_usecase_boxed(
			Arc::new(application_repository),
			Arc::new(application_service),
		);

		let result = usecase.on_assigned(contribution_id, &contributor_id);
		assert!(result.is_ok(), "{:?}", result.err().unwrap());
	}
}
