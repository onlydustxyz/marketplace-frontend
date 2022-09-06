use std::sync::Arc;

use crate::*;
use thiserror::Error;

#[derive(Debug, Error)]
pub enum Error {
	#[error("Aggregate not found")]
	NotFound,
	#[error(transparent)]
	EventStoreError(#[from] EventStoreError),
}

#[derive(Clone)]
pub struct Repository<A: AggregateRoot> {
	event_store: Arc<dyn EventStore<A>>,
}

impl<A: AggregateRoot> Repository<A> {
	pub fn new(event_store: Arc<dyn EventStore<A>>) -> Self {
		Self { event_store }
	}
}

impl<A: AggregateRoot> Repository<A> {
	pub fn find_by_id(&self, id: &A::Id) -> Result<A, Error> {
		let events = self.event_store.list_by_id(&id)?;
		match events {
			_ if events.is_empty() => Err(Error::NotFound),
			events => Ok(A::from_events(&events)),
		}
	}
}

#[cfg(test)]
mod tests {
	use assert_matches::assert_matches;
	use std::str::FromStr;

	use super::*;
	use mockall::predicate::eq;
	use rstest::{fixture, rstest};

	#[fixture]
	fn event_store() -> MockEventStore<Contribution> {
		MockEventStore::new()
	}

	#[rstest]
	fn test_not_found(mut event_store: MockEventStore<Contribution>) {
		let contribution_id = ContributionId::from_str("0xaf").unwrap();
		event_store
			.expect_list_by_id()
			.with(eq(contribution_id.clone()))
			.returning(|_| Ok(vec![]));

		let repository = Repository::new(Arc::new(event_store));
		let result = repository.find_by_id(&contribution_id);
		assert!(result.is_err());
		assert_matches!(result.unwrap_err(), Error::NotFound);
	}

	#[rstest]
	fn test_event_store_error(mut event_store: MockEventStore<Contribution>) {
		let contribution_id = ContributionId::from_str("0xaf").unwrap();
		event_store
			.expect_list_by_id()
			.with(eq(contribution_id.clone()))
			.returning(|_| Err(EventStoreError::List));

		let repository = Repository::new(Arc::new(event_store));
		let result = repository.find_by_id(&contribution_id);
		assert!(result.is_err());
		assert_matches!(
			result.unwrap_err(),
			Error::EventStoreError(EventStoreError::List)
		);
	}

	#[rstest]
	fn test_found(mut event_store: MockEventStore<Contribution>) {
		let contribution_id = ContributionId::from_str("0xaf").unwrap();
		let creation_event = ContributionEvent::Created {
			id: contribution_id.clone(),
			project_id: Default::default(),
			issue_number: Default::default(),
			gate: Default::default(),
		};
		event_store
			.expect_list_by_id()
			.with(eq(contribution_id.clone()))
			.returning(move |_| Ok(vec![creation_event.clone()]));

		let repository = Repository::new(Arc::new(event_store));
		let result = repository.find_by_id(&contribution_id);
		assert!(result.is_ok());
		assert_eq!(&ContributionStatus::Open, result.as_ref().unwrap().status());
		assert_eq!(&contribution_id, result.as_ref().unwrap().id());
	}
}
