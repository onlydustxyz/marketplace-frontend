mod event_sourcable;
mod repository;

use std::{collections::VecDeque, fmt::Debug, ops::Deref};

use derive_new::new;

#[cfg(test)]
pub use self::repository::MockRepository;
pub use self::{
	event_sourcable::{EventSourcable, Identified},
	repository::{Error as RepositoryError, Repository},
};

/// This is the main `Aggregate` struct.
/// It contains a generic State and list of pending events
/// It is intended to be customized for each State to implement commands
/// The command will apply domain rules and generates events
/// The `with_pending_events` function can be used to:
///    - apply the events to the state
///    - save the events waiting for their publication
/// Pending events must then be published to the event store once all commands have been executed
#[derive(Debug, new, PartialEq, Eq, Clone)]
pub struct Aggregate<State: EventSourcable> {
	state: State,
	pending_events: VecDeque<State::Event>,
}

impl<A: super::EventSourcable> Aggregate<A> {
	/// Apply the events to the aggregate state, building a new state
	/// and save the events in the process
	pub fn with_pending_events(mut self, events: Vec<A::Event>) -> Self {
		let aggregate = self.state.apply_events(&events);
		self.pending_events.extend(events.into_iter());
		Self {
			state: aggregate,
			..self
		}
	}

	/// Build an aggregate from events
	pub fn from_pending_events(events: Vec<A::Event>) -> Self {
		Self::new(A::from_events(&events), events.into())
	}
}

/**
 * Required to implement the EventSourcable trait
 */
impl<State: EventSourcable> Default for Aggregate<State> {
	fn default() -> Self {
		Self {
			state: Default::default(),
			pending_events: Default::default(),
		}
	}
}

/**
 * Allow to iterate over all pending events directly from an aggregate
 */
impl<State: EventSourcable> Iterator for Aggregate<State> {
	type Item = State::Event;

	fn next(&mut self) -> Option<Self::Item> {
		self.pending_events.pop_front()
	}
}

/**
 * Allow to access state members directly from an aggregate
 */
impl<State: EventSourcable> Deref for Aggregate<State> {
	type Target = State;

	fn deref(&self) -> &Self::Target {
		&self.state
	}
}

/**
 * An aggregate is event-sourcable as long as its state is event-sourcable
 */
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
