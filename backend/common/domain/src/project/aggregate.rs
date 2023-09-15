use std::collections::{HashMap, HashSet};

use chrono::Utc;
use thiserror::Error;

use crate::*;

#[derive(Debug, Error, PartialEq, Eq)]
pub enum Error {
	#[error("Budget already exists for the given currency")]
	BudgetAlreadyExists,
	#[error("Project lead already assigned to this project")]
	LeaderAlreadyAssigned,
	#[error("User is not a project leader")]
	NotLeader,
	#[error("Github repository already linked to this project")]
	GithubRepoAlreadyLinked,
	#[error("Github repository is not linked to this project")]
	GithubRepoNotLinked,
	#[error("User already applied to this project")]
	UserAlreadyApplied,
}

type Result<T> = std::result::Result<T, Error>;

#[derive(Default, Debug, Clone, PartialEq, Eq)]
pub struct Project {
	pub id: ProjectId,
	pub leaders: HashSet<UserId>,
	pub budgets_by_currency: HashMap<String, BudgetId>,
	pub github_repos: HashSet<GithubRepoId>,
	pub applicants: HashSet<UserId>,
	pending_events: Vec<ProjectEvent>,
}

impl Aggregate for Project {
	type Event = ProjectEvent;
	type Id = ProjectId;

	fn pending_events(&mut self) -> &mut Vec<Self::Event> {
		&mut self.pending_events
	}
}

impl From<ProjectEvent> for Event {
	fn from(event: ProjectEvent) -> Self {
		Event::Project(event)
	}
}

impl EventSourcable for Project {
	fn apply_event(mut self, event: &Self::Event) -> Self {
		match event {
			ProjectEvent::Created { id } => Project {
				id: *id,
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
			ProjectEvent::BudgetLinked {
				budget_id,
				currency,
				..
			} => {
				self.budgets_by_currency.insert(currency.code.to_owned(), *budget_id);
				self
			},
			ProjectEvent::GithubRepoLinked { github_repo_id, .. } => {
				self.github_repos.insert(*github_repo_id);
				self
			},
			ProjectEvent::GithubRepoUnlinked { github_repo_id, .. } => {
				self.github_repos.remove(github_repo_id);
				self
			},
			ProjectEvent::Applied { applicant_id, .. } => {
				self.applicants.insert(*applicant_id);
				self
			},
		}
	}
}

impl Project {
	pub fn create(id: ProjectId) -> Self {
		Self::default().with_pending_events(&[ProjectEvent::Created { id }])
	}

	pub fn link_budget(self, budget_id: BudgetId, currency: &'static Currency) -> Result<Self> {
		if self.budgets_by_currency.contains_key(currency.code) {
			return Err(Error::BudgetAlreadyExists);
		}

		let event = ProjectEvent::BudgetLinked {
			id: self.id,
			budget_id,
			currency,
		};

		Ok(self.with_pending_events(&[event]))
	}

	pub fn assign_leader(self, leader_id: UserId) -> Result<Self> {
		if self.leaders.contains(&leader_id) {
			return Err(Error::LeaderAlreadyAssigned);
		}

		let event = ProjectEvent::LeaderAssigned {
			id: self.id,
			leader_id,
			assigned_at: Utc::now().naive_utc(),
		};

		Ok(self.with_pending_events(&[event]))
	}

	pub fn unassign_leader(self, leader_id: UserId) -> Result<Self> {
		if !self.leaders.contains(&leader_id) {
			return Err(Error::NotLeader);
		}

		let event = ProjectEvent::LeaderUnassigned {
			id: self.id,
			leader_id,
		};

		Ok(self.with_pending_events(&[event]))
	}

	pub fn link_github_repo(self, github_repo_id: GithubRepoId) -> Result<Self> {
		if self.github_repos.contains(&github_repo_id) {
			return Err(Error::GithubRepoAlreadyLinked);
		}

		let event = ProjectEvent::GithubRepoLinked {
			id: self.id,
			github_repo_id,
		};

		Ok(self.with_pending_events(&[event]))
	}

	pub fn unlink_github_repo(self, github_repo_id: GithubRepoId) -> Result<Self> {
		if !self.github_repos.contains(&github_repo_id) {
			return Err(Error::GithubRepoNotLinked);
		}

		let event = ProjectEvent::GithubRepoUnlinked {
			id: self.id,
			github_repo_id,
		};

		Ok(self.with_pending_events(&[event]))
	}

	pub fn apply(self, applicant_id: UserId) -> Result<Self> {
		if self.applicants.contains(&applicant_id) {
			return Err(Error::UserAlreadyApplied);
		}

		let event = ProjectEvent::Applied {
			id: self.id,
			applicant_id,
		};

		Ok(self.with_pending_events(&[event]))
	}
}

#[cfg(test)]
mod tests {
	use std::str::FromStr;

	use assert_matches::assert_matches;
	use rstest::{fixture, rstest};
	use uuid::Uuid;

	use super::*;
	use crate::ProjectId;

	#[fixture]
	fn project_id() -> ProjectId {
		Uuid::from_str("9859fcd9-b357-495e-9f4c-038ec0ebecb1").unwrap().into()
	}

	#[fixture]
	fn user_id() -> UserId {
		Uuid::from_str("f2e47686-6cfa-403d-be32-795c6aa78fff").unwrap().into()
	}

	#[fixture]
	fn budget_id() -> BudgetId {
		Uuid::from_str("9859fcd9-b357-495e-9f4c-038ec12fecb1").unwrap().into()
	}

	#[fixture]
	fn marketplace_id() -> GithubRepoId {
		498695724_u64.into()
	}

	#[fixture]
	fn project_created(project_id: ProjectId) -> ProjectEvent {
		ProjectEvent::Created { id: project_id }
	}

	#[fixture]
	fn currency() -> &'static Currency {
		currencies::USD
	}

	#[fixture]
	fn budget_linked(
		project_id: ProjectId,
		budget_id: BudgetId,
		currency: &'static Currency,
	) -> ProjectEvent {
		ProjectEvent::BudgetLinked {
			id: project_id,
			budget_id,
			currency,
		}
	}

	#[fixture]
	fn leader_assigned(project_id: ProjectId, user_id: UserId) -> ProjectEvent {
		ProjectEvent::LeaderAssigned {
			id: project_id,
			leader_id: user_id,
			assigned_at: Utc::now().naive_utc(),
		}
	}

	#[fixture]
	fn leader_unassigned(project_id: ProjectId, user_id: UserId) -> ProjectEvent {
		ProjectEvent::LeaderUnassigned {
			id: project_id,
			leader_id: user_id,
		}
	}

	#[fixture]
	fn marketplace_linked(project_id: ProjectId, marketplace_id: GithubRepoId) -> ProjectEvent {
		ProjectEvent::GithubRepoLinked {
			id: project_id,
			github_repo_id: marketplace_id,
		}
	}

	#[fixture]
	fn marketplace_unlinked(project_id: ProjectId, marketplace_id: GithubRepoId) -> ProjectEvent {
		ProjectEvent::GithubRepoUnlinked {
			id: project_id,
			github_repo_id: marketplace_id,
		}
	}

	#[fixture]
	fn user_applied(project_id: ProjectId, user_id: UserId) -> ProjectEvent {
		ProjectEvent::Applied {
			id: project_id,
			applicant_id: user_id,
		}
	}

	#[rstest]
	fn create_project(project_id: ProjectId, project_created: ProjectEvent) {
		assert_eq!(
			Project::create(project_id).pending_events,
			[project_created]
		);
	}

	#[rstest]
	fn link_budget(
		project_created: ProjectEvent,
		budget_linked: ProjectEvent,
		budget_id: BudgetId,
		currency: &'static Currency,
	) {
		let project = Project::from_events(&[project_created]);
		assert_eq!(
			project.link_budget(budget_id, currency).unwrap().pending_events,
			[budget_linked]
		);
	}

	#[rstest]
	fn link_multiple_budgets(project_created: ProjectEvent, budget_linked: ProjectEvent) {
		let project = Project::from_events(&[project_created, budget_linked]);
		assert!(project.link_budget(BudgetId::new(), currencies::ETH).is_ok());
	}

	#[rstest]
	fn cannot_link_2_budgets_on_same_currency(
		project_created: ProjectEvent,
		budget_linked: ProjectEvent,
		currency: &'static Currency,
	) {
		let project = Project::from_events(&[project_created, budget_linked]);
		assert_eq!(
			project.link_budget(BudgetId::new(), currency),
			Err(Error::BudgetAlreadyExists)
		);
	}

	#[rstest]
	fn assign_leader_to_project(
		project_created: ProjectEvent,
		user_id: UserId,
		project_id: ProjectId,
	) {
		let project = Project::from_events(&[project_created]);

		let before = Utc::now().naive_utc();
		let events = project.assign_leader(user_id.to_owned()).unwrap().pending_events;
		let after = Utc::now().naive_utc();

		assert_eq!(events.len(), 1);

		assert_matches!(
			events[0],
			ProjectEvent::LeaderAssigned {
				id,
				leader_id,
				assigned_at
			} => {
				assert_eq!(id, project_id);
				assert_eq!(leader_id, user_id);
				assert!(before <= assigned_at);
				assert!(after >= assigned_at);
			}
		);
	}

	#[rstest]
	fn unassign_leader_from_project(
		project_created: ProjectEvent,
		leader_assigned: ProjectEvent,
		leader_unassigned: ProjectEvent,
		user_id: UserId,
	) {
		let project = Project::from_events(&[project_created, leader_assigned]);

		assert_eq!(
			project.unassign_leader(user_id.to_owned()).unwrap().pending_events,
			[leader_unassigned]
		);
	}

	#[rstest]
	fn cannot_assign_twice_the_same_leader(
		project_created: ProjectEvent,
		leader_assigned: ProjectEvent,
		user_id: UserId,
	) {
		let project = Project::from_events(&[project_created, leader_assigned]);

		assert_eq!(
			project.assign_leader(user_id.to_owned()),
			Err(Error::LeaderAlreadyAssigned)
		);
	}

	#[rstest]
	fn cannot_unassign_non_leader(project_created: ProjectEvent, user_id: UserId) {
		let project = Project::from_events(&[project_created]);
		assert_eq!(
			project.unassign_leader(user_id.to_owned()),
			Err(Error::NotLeader)
		);
	}

	#[rstest]
	fn user_apply_to_project(
		project_created: ProjectEvent,
		user_applied: ProjectEvent,
		user_id: UserId,
	) {
		let project = Project::from_events(&[project_created]);
		assert_eq!(
			project.apply(user_id).unwrap().pending_events,
			[user_applied]
		);
	}

	#[rstest]
	fn user_cannot_apply_twice(
		project_created: ProjectEvent,
		user_applied: ProjectEvent,
		user_id: UserId,
	) {
		let project = Project::from_events(&[project_created, user_applied]);
		assert_eq!(project.apply(user_id), Err(Error::UserAlreadyApplied));
	}

	#[rstest]
	fn link_github_repo(
		project_created: ProjectEvent,
		marketplace_linked: ProjectEvent,
		marketplace_id: GithubRepoId,
	) {
		let project = Project::from_events(&[project_created]);
		assert_eq!(
			project.link_github_repo(marketplace_id).unwrap().pending_events,
			[marketplace_linked]
		);
	}

	#[rstest]
	fn unlink_github_repo(
		project_created: ProjectEvent,
		marketplace_linked: ProjectEvent,
		marketplace_unlinked: ProjectEvent,
		marketplace_id: GithubRepoId,
	) {
		let project = Project::from_events(&[project_created, marketplace_linked]);
		assert_eq!(
			project.unlink_github_repo(marketplace_id).unwrap().pending_events,
			[marketplace_unlinked]
		);
	}

	#[rstest]
	fn cannot_link_twice_same_repo(
		project_created: ProjectEvent,
		marketplace_linked: ProjectEvent,
		marketplace_id: GithubRepoId,
	) {
		let project = Project::from_events(&[project_created, marketplace_linked]);
		assert_eq!(
			project.link_github_repo(marketplace_id),
			Err(Error::GithubRepoAlreadyLinked)
		);
	}

	#[rstest]
	fn cannot_unlink_unexisting_repo(project_created: ProjectEvent, marketplace_id: GithubRepoId) {
		let project = Project::from_events(&[project_created]);
		assert_eq!(
			project.unlink_github_repo(marketplace_id),
			Err(Error::GithubRepoNotLinked)
		);
	}
}
