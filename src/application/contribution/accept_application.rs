use std::sync::Arc;

use mapinto::ResultMapErrInto;

use crate::domain::{ApplicationId, ApplicationService, ContributionService, DomainError};

pub trait Usecase: Send + Sync {
	fn accept_application(&self, application_id: &ApplicationId) -> Result<(), DomainError>;
}

pub struct AcceptApplication {
	contribution_service: Arc<dyn ContributionService>,
	application_repository: Arc<dyn ApplicationService>,
}

impl AcceptApplication {
	pub fn new_usecase_boxed(
		contribution_service: Arc<dyn ContributionService>,
		application_repository: Arc<dyn ApplicationService>,
	) -> Box<dyn Usecase> {
		Box::new(Self {
			contribution_service,
			application_repository,
		})
	}
}

impl Usecase for AcceptApplication {
	fn accept_application(&self, application_id: &ApplicationId) -> Result<(), DomainError> {
		let accepted_application = self
			.application_repository
			.accept_application(application_id)
			.map_err(DomainError::from)?;

		self.contribution_service
			.assign_contributor(
				accepted_application.contribution_id().to_string(),
				*accepted_application.contributor_id(),
			)
			.map_err_into()
	}
}
