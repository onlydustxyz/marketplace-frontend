use std::sync::Arc;

use marketplace_domain::{Error as DomainError, *};

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
	contribution_repository: Arc<dyn AggregateRootRepository<Contribution>>,
	contribution_service: Arc<dyn ContributionService>,
}

impl ApplyToContribution {
	pub fn new(
		contribution_service: Arc<dyn ContributionService>,
		contribution_repository: Arc<dyn AggregateRootRepository<Contribution>>,
	) -> Self {
		Self {
			contribution_service,
			contribution_repository,
		}
	}
}

impl ApplyToContribution {
	pub fn new_usecase_boxed(
		contribution_service: Arc<dyn ContributionService>,
		contribution_repository: Arc<dyn AggregateRootRepository<Contribution>>,
	) -> Box<dyn Usecase> {
		Box::new(Self::new(contribution_service, contribution_repository))
	}
}

impl Usecase for ApplyToContribution {
	fn apply_to_contribution(
		&self,
		contribution_id: &ContributionId,
		contributor_id: &ContributorId,
	) -> Result<(), DomainError> {
		let mut contribution = self.contribution_repository.find_by_id(contribution_id)?;
		let events = contribution.apply(contributor_id)?;
		self.contribution_service.apply(contribution_id, contributor_id)
	}
}
