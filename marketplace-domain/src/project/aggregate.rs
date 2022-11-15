use crate::*;

#[derive(Default, Debug, Clone, PartialEq, Eq)]
pub struct Project {
	pub id: ProjectId,
	pub name: String,
}

impl Aggregate for Project {
	type Event = ProjectEvent;
	type Id = GithubProjectId;
}

impl From<ProjectEvent> for Event {
	fn from(event: ProjectEvent) -> Self {
		Event::Project(event)
	}
}
