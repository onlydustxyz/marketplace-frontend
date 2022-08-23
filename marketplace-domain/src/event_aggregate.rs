pub trait Aggregate {
	type Id;
	type State;
	type Event;

	fn apply(state: Self::State, event: Self::Event) -> Self::State;
}
