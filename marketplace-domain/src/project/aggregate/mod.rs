use crate::*;

mod event;
pub use event::Event;

#[derive(Default, Debug, Clone, PartialEq, Eq)]
pub struct Project;

impl Aggregate for Project {
	type Event = Event;
	type Id = GithubProjectId;
}
