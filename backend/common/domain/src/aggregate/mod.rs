mod event_sourcable;
mod repository;

use std::{
	collections::VecDeque,
	fmt::Debug,
	ops::{Deref, DerefMut},
};

use derive_new::new;

#[cfg(test)]
pub use self::repository::MockRepository;
pub use self::{
	event_sourcable::{EventSourcable, Identified},
	repository::{Error as RepositoryError, Repository},
};

#[derive(Debug, new, PartialEq, Eq, Clone)]
pub struct Aggregate<State: EventSourcable> {
	state: State,
	pending_events: VecDeque<State::Event>,
}

impl<State: EventSourcable> Default for Aggregate<State> {
	fn default() -> Self {
		Self {
			state: Default::default(),
			pending_events: Default::default(),
		}
	}
}

impl<State: EventSourcable> Iterator for Aggregate<State> {
	type Item = State::Event;

	fn next(&mut self) -> Option<Self::Item> {
		self.pending_events.pop_front()
	}
}

impl<State: EventSourcable> Deref for Aggregate<State> {
	type Target = State;

	fn deref(&self) -> &Self::Target {
		&self.state
	}
}

impl<State: EventSourcable> DerefMut for Aggregate<State> {
	fn deref_mut(&mut self) -> &mut Self::Target {
		&mut self.state
	}
}

impl<A: super::EventSourcable> Aggregate<A> {
	pub fn with_pending_events(mut self, events: Vec<A::Event>) -> Self {
		let aggregate = self.state.apply_events(&events);
		self.pending_events.extend(events.into_iter());
		Self {
			state: aggregate,
			..self
		}
	}

	pub fn from_pending_events(events: Vec<A::Event>) -> Self {
		Self::new(A::from_events(&events), events.into())
	}
}

impl<State: EventSourcable> EventSourcable for Aggregate<State> {
	type Event = State::Event;
	type Id = State::Id;

	fn apply_event(self, event: &Self::Event) -> Self {
		Self {
			state: self.state.apply_event(event),
			..self
		}
	}
}
