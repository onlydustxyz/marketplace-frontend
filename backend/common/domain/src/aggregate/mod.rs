use std::{
	fmt::{Debug, Display},
	hash::Hash,
};

use serde::{de::DeserializeOwned, Serialize};

mod repository;
#[cfg(test)]
pub use repository::MockRepository;
pub use repository::{Error as RepositoryError, Repository};

pub trait Aggregate: Send + Sync + Default + Sized {
	type Id: Display + PartialEq + Eq + Hash + Clone + Send;
	type Event: Serialize + DeserializeOwned + Debug + Display + Clone + Event<Self> + Send;
}

pub trait Event<A: Aggregate> {
	fn aggregate_id(&self) -> &A::Id;
}

pub trait EventSourcable: Aggregate {
	fn apply_event(self, event: &Self::Event) -> Self;

	fn apply_events(self, events: &[Self::Event]) -> Self {
		events.iter().fold(self, Self::apply_event)
	}

	fn from_events(events: &[Self::Event]) -> Self {
		Self::apply_events(Default::default(), events)
	}
}
