pub trait Aggregate: Send + Sync {
	type Id: PartialEq;
	type Event;
	type State: Default;

	fn apply_event(state: Self::State, event: &Self::Event) -> Self::State;

	fn apply_events(state: Self::State, events: &Vec<Self::Event>) -> Self::State {
		events.iter().fold(state, Self::apply_event)
	}

	fn from_events(events: &Vec<Self::Event>) -> Self::State {
		Self::apply_events(Default::default(), events)
	}
}

pub trait AggregateRoot: Aggregate {}
