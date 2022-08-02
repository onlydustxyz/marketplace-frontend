use crate::domain::*;
use mockall::automock;
use std::sync::Arc;

#[automock]
pub trait Usecase: Send + Sync {
	fn send_creation_request(&self, contribution: Contribution) -> AnyResult<()>;
}

pub struct CreateContribution {
	contribution_service: Arc<dyn ContributionService>,
}

impl CreateContribution {
	pub fn new_usecase(contribution_service: Arc<dyn ContributionService>) -> Box<dyn Usecase> {
		Box::new(Self {
			contribution_service,
		})
	}
}

impl Usecase for CreateContribution {
	fn send_creation_request(&self, contribution: Contribution) -> AnyResult<()> {
		self.contribution_service.create(contribution)
	}
}
