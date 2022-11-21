use derive_getters::{Dissolve, Getters};
use derive_more::Constructor;
use uuid::Uuid;

use crate::*;

#[derive(Default, Debug, Clone, PartialEq, Eq, Getters, Dissolve, Constructor)]
pub struct Project {
	id: ProjectId,
	name: String,
	leaders: Vec<Uuid>,
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

impl EventSourcable for Project {
	fn apply_event(mut self, event: &Self::Event) -> Self {
		match event {
			ProjectEvent::Created { id, name } => Project {
				id: *id,
				name: name.to_owned(),
				..Default::default()
			},
			ProjectEvent::LeaderAssigned { id, leader_id } => {
				self.leaders.push(*leader_id);
				Project { id: *id, ..self }
			},
		}
	}
}

impl AggregateRoot for Project {}

impl Project {
	pub fn create(id: ProjectId, name: String) -> Vec<<Self as Aggregate>::Event> {
		vec![ProjectEvent::Created { id, name }]
	}

	pub fn assign_leader(&self, leader_id: Uuid) -> Vec<<Self as Aggregate>::Event> {
		vec![ProjectEvent::LeaderAssigned {
			id: self.id,
			leader_id,
		}]
	}
}

#[cfg(test)]
mod tests {
	use std::str::FromStr;

	use rstest::{fixture, rstest};

	use super::*;
	use crate::ProjectId;

	#[fixture]
	fn project_id() -> ProjectId {
		Uuid::from_str("9859fcd9-b357-495e-9f4c-038ec0ebecb1").unwrap().into()
	}

	#[fixture]
	fn leader_id() -> Uuid {
		Uuid::from_str("f2e47686-6cfa-403d-be32-795c6aa78fff").unwrap()
	}

	#[fixture]
	fn project_created(project_id: ProjectId) -> ProjectEvent {
		ProjectEvent::Created {
			id: project_id,
			name: "La barbe de la femme à Georges Moustaki".to_string(),
		}
	}

	#[rstest]
	fn test_create(project_id: ProjectId) {
		let project_name = "My cool project";
		let events = Project::create(project_id, project_name.to_string());

		assert_eq!(events.len(), 1);
		assert_eq!(
			events[0],
			ProjectEvent::Created {
				id: project_id,
				name: project_name.to_string()
			}
		);
	}

	#[rstest]
	fn test_assign_leader(project_created: ProjectEvent, leader_id: Uuid, project_id: ProjectId) {
		let project = Project::from_events(&vec![project_created]);

		let events = project.assign_leader(leader_id.to_owned());

		assert_eq!(events.len(), 1);
		assert_eq!(
			events[0],
			ProjectEvent::LeaderAssigned {
				id: project_id,
				leader_id
			}
		);
	}
}
