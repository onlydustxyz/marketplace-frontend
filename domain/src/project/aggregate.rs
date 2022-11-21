use derive_getters::{Dissolve, Getters};
use derive_more::Constructor;

use crate::*;

#[derive(Default, Debug, Clone, PartialEq, Eq, Getters, Dissolve, Constructor)]
pub struct Project {
	id: ProjectId,
	name: String,
}

impl Aggregate for Project {
	type Event = ProjectEvent;
	type Id = ProjectId;
}

impl From<ProjectEvent> for Event {
	fn from(event: ProjectEvent) -> Self {
		Event::Project(event)
	}
}

impl Project {
	pub fn create(id: ProjectId, name: String) -> Vec<<Self as Aggregate>::Event> {
		vec![ProjectEvent::Created { id, name }]
	}
}
