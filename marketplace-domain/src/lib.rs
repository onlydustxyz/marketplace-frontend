mod entities;
pub use entities::*;

mod repositories;
pub use repositories::*;

mod value_objects;
pub use value_objects::*;

mod errors;
pub use errors::Error;
use Error as DomainError;

mod services;
pub use services::*;

mod actions;
pub use actions::*;

mod event;
pub use event::{Event, StorableEvent};

mod event_store;
pub use event_store::{Error as EventStoreError, MockStore as MockEventStore, Store as EventStore};

mod aggregate;
pub use aggregate::{Aggregate, AggregateRoot};

mod projector;
pub use projector::Projector;

mod projection_repository;
pub use projection_repository::{Error as ProjectionRepositoryError, ProjectionRepository};

mod contribution;
pub use contribution::{AggregateId as ContributionId, *};

mod aggregate_root_repository;
pub use aggregate_root_repository::{
	Error as AggregateRootRepositoryError, Repository as AggregateRootRepository,
	RepositoryImplementation as AggregateRootRepositoryImplementation,
};

#[cfg(test)]
pub use aggregate_root_repository::MockRepository as MockAggregateRootRepository;
