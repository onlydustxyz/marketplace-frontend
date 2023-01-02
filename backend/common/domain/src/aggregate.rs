use std::fmt::{Debug, Display};

use serde::{de::DeserializeOwned, Serialize};

use crate::Entity;

pub trait Aggregate: Entity + Send + Sync + Default + Sized {
	type Event: Serialize + DeserializeOwned + Debug + Display + Clone;
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
