use crate::{
	specifications::Error, AggregateRoot, AggregateRootRepository, AggregateRootRepositoryError,
	Project,
};
#[cfg(test)]
use mockall::automock;
use std::sync::Arc;

pub struct Specification<A: AggregateRoot> {
	aggregate_repository: Arc<AggregateRootRepository<A>>,
}

#[cfg_attr(test, automock)]
impl<A: AggregateRoot + 'static> Specification<A> {
	pub fn new(aggregate_repository: Arc<AggregateRootRepository<A>>) -> Self {
		Self {
			aggregate_repository,
		}
	}

	pub fn is_satisfied_by(&self, aggregate_id: &A::Id) -> Result<bool, Error> {
		match self.aggregate_repository.find_by_id(aggregate_id) {
			Ok(_) => Ok(true),
			Err(e) => match e {
				AggregateRootRepositoryError::NotFound => Ok(false),
				AggregateRootRepositoryError::EventStoreError(_) => Err(Error::EventStore(e)),
			},
		}
	}
}

pub type ProjectExists = Specification<Project>;

#[cfg(test)]
pub type MockProjectExists = MockSpecification<Project>;
