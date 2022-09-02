pub trait Aggregate: Send + Sync {
	type Id: PartialEq;
	type Event;
	type State: Default;
	fn apply_event(state: Self::State, event: &Self::Event) -> Self::State;
	fn from_events(events: Vec<Self::Event>) -> Self::State {
		events.iter().fold(Default::default(), Self::apply_event)
	}
}

pub trait AggregateRoot: Aggregate {}
