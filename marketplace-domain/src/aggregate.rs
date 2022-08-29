pub trait Aggregate: Send + Sync {
	type Id: PartialEq;
	type Event;
	fn apply_event(&mut self, event: &Self::Event);
	fn from_events(events: Vec<Self::Event>) -> Self;
}

pub trait AggregateRoot: Aggregate {}
