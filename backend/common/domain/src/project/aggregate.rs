use std::collections::HashSet;

use derive_getters::{Dissolve, Getters};
use derive_more::Constructor;
use thiserror::Error;

use crate::*;

#[derive(Debug, Error, Eq, PartialEq)]
pub enum Error {
	#[error("Project lead already assigned to this project")]
	LeaderAlreadyAssigned,
	#[error("This was already the project github repository")]
	AlreadyProjectGithubRepository,
}

#[derive(Default, Debug, Clone, PartialEq, Eq, Getters, Dissolve, Constructor)]
pub struct Project {
	id: ProjectId,
	name: String,
	github_repo_id: GithubRepositoryId,
	leaders: HashSet<UserId>,
}

impl Entity for Project {
	type Id = ProjectId;
}

impl Aggregate for Project {
	type Event = ProjectEvent;
}

impl AggregateRoot for Project {}

impl From<ProjectEvent> for Event {
	fn from(event: ProjectEvent) -> Self {
		Event::Project(event)
	}
}

impl EventSourcable for Project {
	fn apply_event(mut self, event: &Self::Event) -> Self {
		match event {
			ProjectEvent::Created {
				id,
				name,
				github_repo_id,
			} => Project {
				id: *id,
				name: name.to_owned(),
				github_repo_id: github_repo_id.to_owned(),
				..Default::default()
			},
			ProjectEvent::LeaderAssigned { leader_id, .. } => {
				self.leaders.insert(*leader_id);
				self
			},
			ProjectEvent::GithubRepositoryUpdated { github_repo_id, .. } => {
				self.github_repo_id = *github_repo_id;
				self
			},
		}
	}
}

impl Project {
	pub fn create(
		id: ProjectId,
		name: String,
		github_repo_id: GithubRepositoryId,
	) -> Result<Vec<<Self as Aggregate>::Event>, Error> {
		Ok(vec![ProjectEvent::Created {
			id,
			name,
			github_repo_id,
		}])
	}

	pub fn assign_leader(
		&self,
		leader_id: UserId,
	) -> Result<Vec<<Self as Aggregate>::Event>, Error> {
		if self.leaders.contains(&leader_id) {
			return Err(Error::LeaderAlreadyAssigned);
		}
		Ok(vec![ProjectEvent::LeaderAssigned {
			id: self.id,
			leader_id,
		}])
	}

	pub fn update_github_repository(
		&self,
		github_repo_id: GithubRepositoryId,
	) -> Result<Vec<<Self as Aggregate>::Event>, Error> {
		if self.github_repo_id == github_repo_id {
			return Err(Error::AlreadyProjectGithubRepository);
		}

		Ok(vec![ProjectEvent::GithubRepositoryUpdated {
			id: self.id,
			github_repo_id,
		}])
	}
}

#[cfg(test)]
mod tests {
	use std::str::FromStr;

	use rstest::{fixture, rstest};
	use uuid::Uuid;

	use super::*;
	use crate::{GithubRepositoryId, ProjectId};

	#[fixture]
	fn project_id() -> ProjectId {
		Uuid::from_str("9859fcd9-b357-495e-9f4c-038ec0ebecb1").unwrap().into()
	}

	#[fixture]
	fn leader_id() -> UserId {
		Uuid::from_str("f2e47686-6cfa-403d-be32-795c6aa78fff").unwrap().into()
	}

	#[fixture]
	fn github_repo_id() -> GithubRepositoryId {
		4324334i64.into()
	}

	#[fixture]
	fn project_created(project_id: ProjectId) -> ProjectEvent {
		ProjectEvent::Created {
			id: project_id,
			name: "La barbe de la femme à Georges Moustaki".to_string(),
			github_repo_id: 12345.into(),
		}
	}

	#[rstest]
	fn test_create(project_id: ProjectId) {
		let project_name = "My cool project";
		let github_repo_id: GithubRepositoryId = 12345.into();
		let events = Project::create(project_id, project_name.to_string(), github_repo_id).unwrap();

		assert_eq!(events.len(), 1);
		assert_eq!(
			events[0],
			ProjectEvent::Created {
				id: project_id,
				name: project_name.to_string(),
				github_repo_id
			}
		);
	}

	#[rstest]
	fn test_assign_leader(project_created: ProjectEvent, leader_id: UserId, project_id: ProjectId) {
		let project = Project::from_events(&[project_created]);

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
	fn test_assign_twice_the_same_leader(project_created: ProjectEvent, leader_id: UserId) {
		let project = Project::from_events(&[project_created]);
		let events = project.assign_leader(leader_id.to_owned()).unwrap();
		let project = project.apply_events(&events);

		let result = project.assign_leader(leader_id.to_owned());

		assert!(result.is_err());
		assert_eq!(result.unwrap_err(), Error::LeaderAlreadyAssigned);
	}

	#[rstest]
	fn test_update_github_repo(
		project_created: ProjectEvent,
		github_repo_id: GithubRepositoryId,
		project_id: ProjectId,
	) {
		let project = Project::from_events(&[project_created]);

		let events = project.update_github_repository(github_repo_id).unwrap();

		assert_eq!(events.len(), 1);
		assert_eq!(
			events[0],
			ProjectEvent::GithubRepositoryUpdated {
				id: project_id,
				github_repo_id
			}
		);
	}

	#[rstest]
	fn test_set_github_repo_id_to_current_value(
		project_created: ProjectEvent,
		github_repo_id: GithubRepositoryId,
	) {
		let project = Project::from_events(&[project_created]);
		let events = project.update_github_repository(github_repo_id).unwrap();
		let project = project.apply_events(&events);

		let result = project.update_github_repository(github_repo_id);

		assert!(result.is_err());
		assert_eq!(result.unwrap_err(), Error::AlreadyProjectGithubRepository);
	}
}
