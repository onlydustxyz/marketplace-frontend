use std::{
	collections::VecDeque,
	ops::{Deref, DerefMut},
};

use derive_new::new;

#[derive(Debug, new, PartialEq, Eq, Clone)]
pub struct Aggregate<A: super::Aggregate> {
	aggregate: A,
	pending_events: VecDeque<A::Event>,
}

impl<A: super::Aggregate> Default for Aggregate<A> {
	fn default() -> Self {
		Self {
			aggregate: Default::default(),
			pending_events: Default::default(),
		}
	}
}

impl<A: super::Aggregate> Iterator for Aggregate<A> {
	type Item = A::Event;

	fn next(&mut self) -> Option<Self::Item> {
		self.pending_events.pop_front()
	}
}

impl<A: super::Aggregate> Deref for Aggregate<A> {
	type Target = A;

	fn deref(&self) -> &Self::Target {
		&self.aggregate
	}
}

impl<A: super::Aggregate> DerefMut for Aggregate<A> {
	fn deref_mut(&mut self) -> &mut Self::Target {
		&mut self.aggregate
	}
}

impl<A: super::EventSourcable> Aggregate<A> {
	pub fn with_pending_events(mut self, events: Vec<A::Event>) -> Self {
		let aggregate = self.aggregate.apply_events(&events);
		self.pending_events.extend(events.into_iter());
		Self { aggregate, ..self }
	}

	pub fn from_pending_events(events: Vec<A::Event>) -> Self {
		Self::new(A::from_events(&events), events.into())
	}
}

impl<A: super::Aggregate> super::Aggregate for Aggregate<A> {
	type Event = A::Event;
	type Id = A::Id;
}

impl<A: super::EventSourcable> super::EventSourcable for Aggregate<A> {
	fn apply_event(self, event: &Self::Event) -> Self {
		Self {
			aggregate: self.aggregate.apply_event(event),
			..self
		}
	}
}

// impl<E: super::Event<A>, A: super::Aggregate> super::Event<Aggregate<A>> for E
// where
// 	A::Event: super::Event<A>,
// {
// 	fn aggregate_id(&self) -> &A::Id {
// 		<Self as super::Event<A>>::aggregate_id(&self)
// 	}
// }
