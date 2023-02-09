use std::{collections::HashSet, iter::once, sync::Arc};

use derive_getters::{Dissolve, Getters};
use derive_more::Constructor;
use serde_json::Value;
use thiserror::Error;

use crate::*;

#[derive(Debug, Error)]
pub enum Error {
	#[error("Project lead already assigned to this project")]
	LeaderAlreadyAssigned,
	#[error("User is not a project leader")]
	NotLeader,
	#[error("This was already the project github repository")]
	AlreadyProjectGithubRepository,
	#[error("Github repository {0} does not exist")]
	GithubRepositoryNotFound(GithubRepositoryId),
	#[error(transparent)]
	Infrastructure(anyhow::Error),
	#[error(transparent)]
	Budget(#[from] BudgetError),
}

type Result<T> = std::result::Result<T, Error>;

#[derive(Default, Debug, Clone, PartialEq, Eq, Getters, Dissolve, Constructor)]
pub struct Project {
	id: ProjectId,
	name: String,
	github_repo_id: GithubRepositoryId,
	leaders: HashSet<UserId>,
	budget: Budget,
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
			ProjectEvent::LeaderUnassigned { leader_id, .. } => {
				self.leaders.remove(leader_id);
				self
			},
			ProjectEvent::GithubRepositoryUpdated { github_repo_id, .. } => {
				self.github_repo_id = *github_repo_id;
				self
			},
			ProjectEvent::Budget { event, .. } => {
				self.budget = self.budget.apply_event(event);
				self
			},
		}
	}
}

impl Project {
	pub async fn create(
		github_repo_exists: Arc<dyn GithubRepoExists>,
		id: ProjectId,
		name: String,
		github_repo_id: GithubRepositoryId,
		initial_budget: Amount,
	) -> Result<Vec<<Self as Aggregate>::Event>> {
		if !github_repo_exists
			.is_statified_by(&github_repo_id)
			.await
			.map_err(|e| Error::Infrastructure(e.into()))?
		{
			return Err(Error::GithubRepositoryNotFound(github_repo_id));
		}

		let events = Budget::allocate(BudgetId::new(), initial_budget)
			.into_iter()
			.map(|event| ProjectEvent::Budget { id, event });

		Ok(once(ProjectEvent::Created {
			id,
			name,
			github_repo_id,
		})
		.chain(events)
		.collect())
	}

	pub fn assign_leader(&self, leader_id: UserId) -> Result<Vec<<Self as Aggregate>::Event>> {
		if self.leaders.contains(&leader_id) {
			return Err(Error::LeaderAlreadyAssigned);
		}

		Ok(vec![ProjectEvent::LeaderAssigned {
			id: self.id,
			leader_id,
		}])
	}

	pub fn unassign_leader(&self, leader_id: UserId) -> Result<Vec<<Self as Aggregate>::Event>> {
		if !self.leaders.contains(&leader_id) {
			return Err(Error::NotLeader);
		}

		Ok(vec![ProjectEvent::LeaderUnassigned {
			id: self.id,
			leader_id,
		}])
	}

	pub async fn update_github_repository(
		&self,
		github_repo_exists: Arc<dyn GithubRepoExists>,
		github_repo_id: GithubRepositoryId,
	) -> Result<Vec<<Self as Aggregate>::Event>> {
		if self.github_repo_id == github_repo_id {
			return Err(Error::AlreadyProjectGithubRepository);
		}

		if !github_repo_exists
			.is_statified_by(&github_repo_id)
			.await
			.map_err(|e| Error::Infrastructure(e.into()))?
		{
			return Err(Error::GithubRepositoryNotFound(github_repo_id));
		}

		Ok(vec![ProjectEvent::GithubRepositoryUpdated {
			id: self.id,
			github_repo_id,
		}])
	}

	pub async fn request_payment(
		&self,
		payment_id: PaymentId,
		requestor_id: UserId,
		recipient_id: GithubUserId,
		amount: Amount,
		reason: Value,
	) -> Result<Vec<<Self as Aggregate>::Event>> {
		Ok(self
			.budget
			.request_payment(payment_id, requestor_id, recipient_id, amount, reason)?
			.into_iter()
			.map(|event| ProjectEvent::Budget { id: self.id, event })
			.collect())
	}
}

#[cfg(test)]
mod tests {
	use std::str::FromStr;

	use anyhow::anyhow;
	use assert_matches::assert_matches;
	use mockall::predicate::eq;
	use rstest::{fixture, rstest};
	use rust_decimal_macros::dec;
	use uuid::Uuid;

	use super::*;
	use crate::{GithubRepositoryId, MockGithubRepoExists, ProjectId};

	#[fixture]
	fn project_id() -> ProjectId {
		Uuid::from_str("9859fcd9-b357-495e-9f4c-038ec0ebecb1").unwrap().into()
	}

	#[fixture]
	fn project_name() -> &'static str {
		"My cool project"
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
	fn initial_budget() -> Amount {
		Amount::new(dec!(1000), Currency::Crypto("USDC".to_string()))
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
	async fn test_create(
		project_id: ProjectId,
		project_name: &str,
		github_repo_id: GithubRepositoryId,
		initial_budget: Amount,
	) {
		let mut github_repo_exists_specification = MockGithubRepoExists::new();
		github_repo_exists_specification
			.expect_is_statified_by()
			.with(eq(github_repo_id))
			.returning(|_| Ok(true));

		let events = Project::create(
			Arc::new(github_repo_exists_specification),
			project_id,
			project_name.to_string(),
			github_repo_id,
			initial_budget,
		)
		.await
		.unwrap();

		assert_eq!(events.len(), 2);
		assert_eq!(
			events[0],
			ProjectEvent::Created {
				id: project_id,
				name: project_name.to_string(),
				github_repo_id
			}
		);
		assert_matches!(
			events[1],
			ProjectEvent::Budget {
				id: _,
				event: BudgetEvent::Allocated { .. }
			}
		);
	}

	#[rstest]
	async fn test_create_with_unexisting_github_repo(
		project_id: ProjectId,
		project_name: &str,
		github_repo_id: GithubRepositoryId,
		initial_budget: Amount,
	) {
		let mut github_repo_exists_specification = MockGithubRepoExists::new();
		github_repo_exists_specification
			.expect_is_statified_by()
			.with(eq(github_repo_id))
			.returning(|_| Ok(false));

		let result = Project::create(
			Arc::new(github_repo_exists_specification),
			project_id,
			project_name.to_string(),
			github_repo_id,
			initial_budget,
		)
		.await;

		assert!(result.is_err());
		assert_matches!(result.unwrap_err(), Error::GithubRepositoryNotFound(_));
	}

	#[rstest]
	async fn test_create_with_internal_error(
		project_id: ProjectId,
		project_name: &str,
		github_repo_id: GithubRepositoryId,
		initial_budget: Amount,
	) {
		let mut github_repo_exists_specification = MockGithubRepoExists::new();
		github_repo_exists_specification
			.expect_is_statified_by()
			.with(eq(github_repo_id))
			.returning(|_| Err(SpecificationError::Infrastructure(anyhow!("some error"))));

		let result = Project::create(
			Arc::new(github_repo_exists_specification),
			project_id,
			project_name.to_string(),
			github_repo_id,
			initial_budget,
		)
		.await;

		assert!(result.is_err());
		assert_matches!(result.unwrap_err(), Error::Infrastructure(_));
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
		assert_matches!(result.unwrap_err(), Error::LeaderAlreadyAssigned);
	}

	#[rstest]
	async fn test_update_github_repo(
		project_created: ProjectEvent,
		github_repo_id: GithubRepositoryId,
		project_id: ProjectId,
	) {
		let project = Project::from_events(&[project_created]);

		let mut github_repo_exists_specification = MockGithubRepoExists::new();
		github_repo_exists_specification
			.expect_is_statified_by()
			.with(eq(github_repo_id))
			.returning(|_| Ok(true));

		let events = project
			.update_github_repository(Arc::new(github_repo_exists_specification), github_repo_id)
			.await
			.unwrap();

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
	async fn test_update_github_repo_with_unexisting_repo(
		project_created: ProjectEvent,
		github_repo_id: GithubRepositoryId,
	) {
		let project = Project::from_events(&[project_created]);

		let mut github_repo_exists_specification = MockGithubRepoExists::new();
		github_repo_exists_specification
			.expect_is_statified_by()
			.with(eq(github_repo_id))
			.returning(|_| Ok(false));

		let result = project
			.update_github_repository(Arc::new(github_repo_exists_specification), github_repo_id)
			.await;

		assert!(result.is_err());
		assert_matches!(result.unwrap_err(), Error::GithubRepositoryNotFound(_));
	}

	#[rstest]
	async fn test_update_github_repo_with_internal_error(
		project_created: ProjectEvent,
		github_repo_id: GithubRepositoryId,
	) {
		let project = Project::from_events(&[project_created]);

		let mut github_repo_exists_specification = MockGithubRepoExists::new();
		github_repo_exists_specification
			.expect_is_statified_by()
			.with(eq(github_repo_id))
			.returning(|_| Err(SpecificationError::Infrastructure(anyhow!("some error"))));

		let result = project
			.update_github_repository(Arc::new(github_repo_exists_specification), github_repo_id)
			.await;

		assert!(result.is_err());
		assert_matches!(result.unwrap_err(), Error::Infrastructure(_));
	}

	#[rstest]
	async fn test_set_github_repo_id_to_current_value(
		project_created: ProjectEvent,
		github_repo_id: GithubRepositoryId,
	) {
		let project = Project::from_events(&[project_created]);

		let mut github_repo_exists_specification = MockGithubRepoExists::new();
		github_repo_exists_specification
			.expect_is_statified_by()
			.with(eq(github_repo_id))
			.returning(|_| Ok(true));
		let github_repo_exists_specification = Arc::new(github_repo_exists_specification);

		let events = project
			.update_github_repository(github_repo_exists_specification.clone(), github_repo_id)
			.await
			.unwrap();
		let project = project.apply_events(&events);

		let result = project
			.update_github_repository(github_repo_exists_specification, github_repo_id)
			.await;

		assert!(result.is_err());
		assert_matches!(result.unwrap_err(), Error::AlreadyProjectGithubRepository);
	}
}
