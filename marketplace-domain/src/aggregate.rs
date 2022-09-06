pub trait Aggregate: Send + Sync + Default + Sized {
	type Id: PartialEq;
	type Event;

	fn apply_event(self, event: &Self::Event) -> Self;

	fn apply_events(self, events: &[Self::Event]) -> Self {
		events.iter().fold(self, Self::apply_event)
	}

	fn from_events(events: &[Self::Event]) -> Self {
		Self::apply_events(Default::default(), events)
	}
}

pub trait AggregateRoot: Aggregate {}
