pub trait AggregateRoot: Send + Sync {
	type Id;
	type Event;
}

pub trait EventSourceable: AggregateRoot {
	fn apply_event(&mut self, event: &Self::Event);
	fn from_events(events: Vec<Self::Event>) -> Self;
}
