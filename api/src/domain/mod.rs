mod event_store;
pub use self::event_store::{Error as EventStoreError, Store as EventStore};

// TODO: Uncomment when needed
// mod aggregate_root;
// pub use aggregate_root::{
// 	AggregateRoot, Error as AggregateRootRepositoryError, Repository as AggregateRootRepository,
// };
