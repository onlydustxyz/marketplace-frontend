/// Mocks the `AggregateRootRepository` trait for testing purposes.
#[cfg(test)]
use mockall_double::double;

/// Mocks the `Specification` struct for testing purposes.
#[cfg_attr(test, automock)]
/// A struct that represents a specification for an aggregate root.
pub struct Specification<A: AggregateRoot + 'static> {
	/// The repository for the aggregate root.
	aggregate_repository: AggregateRootRepository<A>,
}

impl<A: AggregateRoot + 'static> Specification<A> {
	/// Creates a new `Specification`.
	///
	/// # Arguments
	///
	/// * `aggregate_repository` - The repository for the aggregate root.
	pub fn new(aggregate_repository: AggregateRootRepository<A>) -> Self {
		Self {
			aggregate_repository,
		}
	}

	/// Checks if an aggregate satisfies the specification.
	///
	/// # Arguments
	///
	/// * `aggregate_id` - The ID of the aggregate to check.
	///
	/// # Returns
	///
	/// `Ok(true)` if the aggregate satisfies the specification, `Ok(false)` if it does not, and `Err(Error)` if there is an error checking the specification.
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

/// A type alias for a `Specification` for a `Project` aggregate root.
pub type ProjectExists = Specification<Project>;

/// The error type for a specification error.
#[derive(Debug, PartialEq)]
pub enum Error {
	/// An error occurred in the event store.
	EventStore(AggregateRootRepositoryError),
}

#[cfg(test)]
/// A mocked `ProjectExists` for testing purposes.
pub type MockProjectExists = MockSpecification<Project>;

#[cfg(test)]
mod tests {
	use anyhow::anyhow;
	use mockall::predicate::eq;
	use rstest::*;
	use uuid::Uuid;

	use super::*;
	#[double]
	use crate::AggregateRootRepository;
	use crate::{EventStoreError, ProjectId};

	/// Creates a new `AggregateRootRepository` for testing purposes.
	#[fixture]
	fn aggregate_root_repository() -> AggregateRootRepository<Project> {
		AggregateRootRepository::default()
	}

	/// Creates a new `ProjectId` for testing purposes.
	#[fixture]
	#[once]
	fn project_id() -> ProjectId {
		Uuid::new_v4().into()
	}

	#[rstest]
	fn aggregate_exists(
		mut aggregate_root_repository: AggregateRootRepository<Project>,
		project_id: &ProjectId,
	) {
		aggregate_root_repository
			.expect_find_by_id()
			.with(eq(*project_id))
			.once()
			.returning(|_| Ok(Default::default()));

		let result = Specification::new(aggregate_root_repository).is_satisfied_by(project_id);
		assert!(result.is_ok(), "{}", result.err().unwrap());
		assert!(result.unwrap());
	}

	#[rstest]
	fn aggregate_does_not_exists(
		mut aggregate_root_repository: AggregateRootRepository<Project>,
		project_id: &ProjectId,
	) {
		aggregate_root_repository
			.expect_find_by_id()
			.with(eq(*project_id))
			.once()
			.returning(|_| Err(AggregateRootRepositoryError::NotFound));

		let result = Specification::new(aggregate_root_repository).is_satisfied_by(project_id);
		assert!(result.is_ok(), "{}", result.err().unwrap());
		assert!(!result.unwrap());
	}

	#[rstest]
	fn aggregate_repository_error(
		mut aggregate_root_repository: AggregateRootRepository<Project>,
		project_id: &ProjectId,
	) {
		aggregate_root_repository
			.expect_find_by_id()
			.with(eq(*project_id))
			.once()
			.returning(|_| {
				Err(AggregateRootRepositoryError::EventStoreError(
					EventStoreError::Connection(anyhow!("oops")),
				))
			});

		let result = Specification::new(aggregate_root_repository).is_satisfied_by(project_id);
		assert!(result.is_err());
	}
}