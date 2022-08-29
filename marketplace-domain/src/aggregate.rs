pub trait Aggregate: Send + Sync + Default {
	type Id: PartialEq;
	type Event;
	fn apply_event(&mut self, event: &Self::Event);
	fn from_events(events: Vec<Self::Event>) -> Self {
		let mut contribution = Self::default();
		events.iter().for_each(|event| {
			contribution.apply_event(event);
		});
		contribution
	}
}

pub trait AggregateRoot: Aggregate {}
