use std::sync::Arc;

use mapinto::ResultMapErrInto;

use marketplace_domain::{Error as DomainError, *};

pub trait Usecase: Send + Sync {
	fn accept_application(&self, application_id: &ApplicationId) -> Result<(), DomainError>;
}

pub struct AcceptApplication {
	onchain_contribution_service: Arc<dyn OnchainContributionService>,
	contribution_repository: Arc<dyn ContributionRepository>,
	application_service: Arc<dyn ApplicationService>,
}

impl AcceptApplication {
	pub fn new(
		onchain_contribution_service: Arc<dyn OnchainContributionService>,
		contribution_repository: Arc<dyn ContributionRepository>,
		application_service: Arc<dyn ApplicationService>,
	) -> Self {
		Self {
			onchain_contribution_service,
			contribution_repository,
			application_service,
		}
	}
}

impl AcceptApplication {
	pub fn new_usecase_boxed(
		onchain_contribution_service: Arc<dyn OnchainContributionService>,
		contribution_repository: Arc<dyn ContributionRepository>,
		application_service: Arc<dyn ApplicationService>,
	) -> Box<dyn Usecase> {
		Box::new(Self {
			onchain_contribution_service,
			contribution_repository,
			application_service,
		})
	}
}

impl Usecase for AcceptApplication {
	fn accept_application(&self, application_id: &ApplicationId) -> Result<(), DomainError> {
		let application = self
			.application_service
			.accept_application(application_id)
			.map_err(DomainError::from)?;

		let contribution = self
			.contribution_repository
			.find_by_id(application.contribution_id())
			.map_err(DomainError::from)?
			.ok_or_else(|| DomainError::from(ContributionRepositoryError::NotFound))?;

		self.onchain_contribution_service
			.assign_contributor(contribution.onchain_id, *application.contributor_id())
			.map_err_into()
	}
}
