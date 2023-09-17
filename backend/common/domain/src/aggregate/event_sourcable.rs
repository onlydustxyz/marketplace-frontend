use std::{
	fmt::{Debug, Display},
	hash::Hash,
};

use serde::{de::DeserializeOwned, Serialize};

pub trait Identified<Id> {
	fn id(&self) -> &Id;
}

pub trait EventSourcable: Default {
	type Id: Display + PartialEq + Eq + Hash + Clone + Send;
	type Event: Serialize
		+ DeserializeOwned
		+ Debug
		+ Display
		+ Clone
		+ Identified<Self::Id>
		+ Send
		+ Sync;

	fn apply_event(self, event: &Self::Event) -> Self;

	fn apply_events(self, events: &[Self::Event]) -> Self {
		events.iter().fold(self, Self::apply_event)
	}

	fn from_events(events: &[Self::Event]) -> Self {
		Self::apply_events(Default::default(), events)
	}
}
