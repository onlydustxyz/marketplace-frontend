use std::fmt::{Debug, Display};

use serde::{de::DeserializeOwned, Serialize};

use crate::Event;

pub trait Aggregate: Send + Sync + Default + Sized {
	type Event: Serialize + DeserializeOwned + Debug + Display + Clone + Into<Event>;
	type Id: PartialEq + Display;
}

pub trait EventSourcable: Aggregate {
	fn apply_event(self, event: &Event) -> Self;

	fn apply_events(self, events: &[Event]) -> Self {
		events.iter().fold(self, Self::apply_event)
	}

	fn from_events(events: &[Event]) -> Self {
		Self::apply_events(Default::default(), events)
	}
}

pub trait AggregateRoot: EventSourcable {}
