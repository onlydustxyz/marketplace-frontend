use crate::*;

pub mod event;
#[derive(Default, Debug, Clone, PartialEq, Eq)]
pub struct Contributor;

impl Aggregate for Contributor {
	type Event = ContributorEvent;
	type Id = ContributorAccount;
}

impl From<ContributorEvent> for Event {
	fn from(event: ContributorEvent) -> Self {
		Event::Contributor(event)
	}
}
