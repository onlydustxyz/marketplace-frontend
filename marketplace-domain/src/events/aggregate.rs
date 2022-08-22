pub trait Aggregate {
	type Id;
	type State;
	type Event;
	type Error;

	fn apply(state: Self::State, event: Self::Event) -> Result<Self::State, Self::Error>;
}
