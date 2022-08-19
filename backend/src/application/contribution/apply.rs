use std::sync::Arc;

use crate::domain::*;

// Usecase must be `Send` and `Sync` as it is managed in a rocket State<T> that requires T to be
// `Send` and `Sync`
pub trait Usecase: Send + Sync {
	fn apply_to_contribution(
		&self,
		contribution_id: &ContributionId,
		contributor_id: &ContributorId,
	) -> Result<(), DomainError>;
}

pub struct ApplyToContribution {
	contribution_service: Arc<dyn ContributionService>,
}

impl ApplyToContribution {
	pub fn new(contribution_service: Arc<dyn ContributionService>) -> Self {
		Self {
			contribution_service,
		}
	}
}

impl ApplyToContribution {
	pub fn new_usecase_boxed(
		contribution_service: Arc<dyn ContributionService>,
	) -> Box<dyn Usecase> {
		Box::new(Self::new(contribution_service))
	}
}

impl Usecase for ApplyToContribution {
	fn apply_to_contribution(
		&self,
		contribution_id: &ContributionId,
		contributor_id: &ContributorId,
	) -> Result<(), DomainError> {
		self.contribution_service.apply(contribution_id, contributor_id)
	}
}
