use std::{
	collections::VecDeque,
	ops::{Deref, DerefMut},
};

pub struct Aggregate<A: super::Aggregate> {
	aggregate: A,
	pending_events: VecDeque<A::Event>,
}

impl<A: super::Aggregate> From<A> for Aggregate<A> {
	fn from(aggregate: A) -> Self {
		Self {
			aggregate,
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
