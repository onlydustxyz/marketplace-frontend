pub trait Aggregate: Send + Sync {
	type Id;
	type State;
	type Event;

	fn apply(state: Self::State, event: Self::Event) -> Self::State;
}
