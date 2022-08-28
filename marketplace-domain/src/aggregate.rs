pub trait Aggregate: Send + Sync {
	type Id: PartialEq;
	type Event;
	fn apply_event(&mut self, event: &Self::Event);
	fn from_events(events: Vec<Self::Event>) -> Self;
	fn emit(&mut self, event: Self::Event);
}

pub trait AggregateRoot: Aggregate {}
