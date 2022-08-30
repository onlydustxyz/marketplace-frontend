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
	event_store: Arc<dyn EventStore<Contribution>>,
}

impl ApplyToContribution {
	pub fn new(
		contribution_repository: Arc<dyn AggregateRootRepository<Contribution>>,
		contribution_service: Arc<dyn ContributionService>,
		event_store: Arc<dyn EventStore<Contribution>>,
	) -> Self {
		Self {
			contribution_repository,
			contribution_service,
			event_store,
		}
	}
}

impl ApplyToContribution {
	pub fn new_usecase_boxed(
		contribution_repository: Arc<dyn AggregateRootRepository<Contribution>>,
		contribution_service: Arc<dyn ContributionService>,
		event_store: Arc<dyn EventStore<Contribution>>,
	) -> Box<dyn Usecase> {
		Box::new(Self::new(
			contribution_repository,
			contribution_service,
			event_store,
		))
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
		self.event_store.append(&contribution.get_id(), events)?;

		// TODO: remove the following call when using the application projector
		self.contribution_service.apply(contribution_id, contributor_id)?;
		Ok(())
	}
}
