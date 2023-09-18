use std::{
	fmt::{Debug, Display},
	hash::Hash,
};

use serde::{de::DeserializeOwned, Serialize};

pub trait Identified<Id> {
	fn id(&self) -> &Id;
}

/// This trait defines the requirements for an entity to be event-sourcable
/// It is intended to be implemented on a `State`
pub trait EventSourcable: Default {
	/// The aggregate Id type
	type Id: Display + PartialEq + Eq + Hash + Clone + Send;

	/// The aggregate Event type
	type Event: Serialize
		+ DeserializeOwned
		+ Debug
		+ Display
		+ Clone
		+ Identified<Self::Id>
		+ Send
		+ Sync;

	/// Apply a single event to a state and builds a new state
	fn apply_event(self, event: &Self::Event) -> Self;

	/// Apply a list of events to a state and builds a new state
	fn apply_events(self, events: &[Self::Event]) -> Self {
		events.iter().fold(self, Self::apply_event)
	}

	/// Build a new state from events, using Default::default as base
	fn from_events(events: &[Self::Event]) -> Self {
		Self::apply_events(Default::default(), events)
	}
}
