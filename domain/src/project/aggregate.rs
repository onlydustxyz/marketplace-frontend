use std::collections::HashSet;

use derive_getters::{Dissolve, Getters};
use derive_more::Constructor;
use thiserror::Error;
use uuid::Uuid;

use crate::*;

#[derive(Debug, Error, PartialEq)]
pub enum Error {
	#[error("Project lead already assigned to this project")]
	LeaderAlreadyAssigned,
}

#[derive(Default, Debug, Clone, PartialEq, Eq, Getters, Dissolve, Constructor)]
pub struct Project {
	id: ProjectId,
	name: String,
	leaders: HashSet<Uuid>,
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
				self.leaders.insert(*leader_id);
				Project { id: *id, ..self }
			},
		}
	}
}

impl AggregateRoot for Project {}

impl Project {
	pub fn create(id: ProjectId, name: String) -> Result<Vec<<Self as Aggregate>::Event>, Error> {
		Ok(vec![ProjectEvent::Created { id, name }])
	}

	pub fn assign_leader(&self, leader_id: Uuid) -> Result<Vec<<Self as Aggregate>::Event>, Error> {
		if self.leaders.contains(&leader_id) {
			return Err(Error::LeaderAlreadyAssigned);
		}
		Ok(vec![ProjectEvent::LeaderAssigned {
			id: self.id,
			leader_id,
		}])
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
		let events = Project::create(project_id, project_name.to_string()).unwrap();

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

		let events = project.assign_leader(leader_id.to_owned()).unwrap();

		assert_eq!(events.len(), 1);
		assert_eq!(
			events[0],
			ProjectEvent::LeaderAssigned {
				id: project_id,
				leader_id
			}
		);
	}

	#[rstest]
	fn test_assign_twice_the_same_leader(project_created: ProjectEvent, leader_id: Uuid) {
		let project = Project::from_events(&vec![project_created]);
		let events = project.assign_leader(leader_id.to_owned()).unwrap();
		let project = project.apply_events(&events);

		let result = project.assign_leader(leader_id.to_owned());

		assert!(result.is_err());
		assert_eq!(result.unwrap_err(), Error::LeaderAlreadyAssigned);
	}
}
