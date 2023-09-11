use std::collections::{HashMap, HashSet};

use chrono::{Duration, Utc};
use derive_getters::{Dissolve, Getters};
use derive_more::Constructor;
use thiserror::Error;

use crate::{payment::Reason, *};

#[derive(Debug, Error)]
pub enum Error {
	#[error("Project lead already assigned to this project")]
	LeaderAlreadyAssigned,
	#[error("User is not a project leader")]
	NotLeader,
	#[error("Github repository already linked to this project")]
	GithubRepoAlreadyLinked,
	#[error("Github repository is not linked to this project")]
	NotLinked,
	#[error("Budget must be created first")]
	NoBudget,
	#[error(transparent)]
	Infrastructure(anyhow::Error),
	#[error(transparent)]
	Budget(#[from] BudgetError),
	#[error("User already applied to this project")]
	UserAlreadyApplied,
}

type Result<T> = std::result::Result<T, Error>;

#[derive(Default, Debug, Clone, PartialEq, Eq, Getters, Dissolve, Constructor)]
pub struct Project {
	id: ProjectId,
	leaders: HashSet<UserId>,
	budget: Option<Budget>,
	github_repos: HashSet<GithubRepoId>,
	applications: HashMap<ApplicationId, Application>,
}

impl Aggregate for Project {
	type Event = ProjectEvent;
	type Id = ProjectId;
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
			ProjectEvent::Budget { event, .. } => Self {
				budget: Some(self.budget.unwrap_or_default().apply_event(event)),
				..self
			},
			ProjectEvent::GithubRepoLinked { github_repo_id, .. } => {
				self.github_repos.insert(*github_repo_id);
				self
			},
			ProjectEvent::GithubRepoUnlinked { github_repo_id, .. } => {
				self.github_repos.remove(github_repo_id);
				self
			},
			ProjectEvent::Application { event, .. } => {
				self.applications.insert(
					*event.aggregate_id(),
					Application::from_events(&[event.clone()]),
				);
				self
			},
		}
	}
}

impl Project {
	pub fn create(id: ProjectId) -> Vec<<Self as Aggregate>::Event> {
		vec![ProjectEvent::Created { id }]
	}

	pub fn allocate_budget(&self, amount: Amount) -> Result<Vec<<Self as Aggregate>::Event>> {
		let events = match self.budget.as_ref() {
			Some(budget) => budget.allocate(*amount.amount())?,
			None => {
				let events = Budget::create(BudgetId::new(), amount.currency());
				let budget = Budget::from_events(&events);
				events.into_iter().chain(budget.allocate(*amount.amount())?).collect()
			},
		};

		Ok(events
			.into_iter()
			.map(|event| ProjectEvent::Budget { id: self.id, event })
			.collect())
	}

	pub fn assign_leader(&self, leader_id: UserId) -> Result<Vec<<Self as Aggregate>::Event>> {
		if self.leaders.contains(&leader_id) {
			return Err(Error::LeaderAlreadyAssigned);
		}

		Ok(vec![ProjectEvent::LeaderAssigned {
			id: self.id,
			leader_id,
			assigned_at: Utc::now().naive_utc(),
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

	pub fn link_github_repo(
		&self,
		github_repo_id: GithubRepoId,
	) -> Result<Vec<<Self as Aggregate>::Event>> {
		if self.github_repos.contains(&github_repo_id) {
			return Err(Error::GithubRepoAlreadyLinked);
		}

		Ok(vec![ProjectEvent::GithubRepoLinked {
			id: self.id,
			github_repo_id,
		}])
	}

	pub fn unlink_github_repo(
		&self,
		github_repo_id: GithubRepoId,
	) -> Result<Vec<<Self as Aggregate>::Event>> {
		if !self.github_repos.contains(&github_repo_id) {
			return Err(Error::NotLinked);
		}

		Ok(vec![ProjectEvent::GithubRepoUnlinked {
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
		duration_worked: Duration,
		reason: Reason,
	) -> Result<Vec<<Self as Aggregate>::Event>> {
		Ok(self
			.budget
			.as_ref()
			.ok_or(Error::NoBudget)?
			.request_payment(
				payment_id,
				requestor_id,
				recipient_id,
				amount,
				duration_worked,
				reason,
			)?
			.into_iter()
			.map(|event| ProjectEvent::Budget { id: self.id, event })
			.collect())
	}

	pub async fn cancel_payment_request(
		&self,
		payment_id: &PaymentId,
	) -> Result<Vec<<Self as Aggregate>::Event>> {
		Ok(self
			.budget
			.as_ref()
			.ok_or(Error::NoBudget)?
			.cancel_payment_request(payment_id)?
			.into_iter()
			.map(|event| ProjectEvent::Budget { id: self.id, event })
			.collect())
	}

	pub async fn add_payment_receipt(
		&self,
		payment_id: &PaymentId,
		receipt_id: PaymentReceiptId,
		amount: Amount,
		receipt: PaymentReceipt,
	) -> Result<Vec<<Self as Aggregate>::Event>> {
		Ok(self
			.budget
			.as_ref()
			.ok_or(Error::NoBudget)?
			.add_payment_receipt(payment_id, receipt_id, amount, receipt)
			.await?
			.into_iter()
			.map(|event| ProjectEvent::Budget { id: self.id, event })
			.collect())
	}

	pub async fn mark_invoice_as_received(
		&self,
		payment_id: &PaymentId,
	) -> Result<Vec<<Self as Aggregate>::Event>> {
		Ok(self
			.budget
			.as_ref()
			.ok_or(Error::NoBudget)?
			.mark_invoice_as_received(payment_id)?
			.into_iter()
			.map(|event| ProjectEvent::Budget { id: self.id, event })
			.collect())
	}

	pub async fn reject_invoice(
		&self,
		payment_id: &PaymentId,
	) -> Result<Vec<<Self as Aggregate>::Event>> {
		Ok(self
			.budget
			.as_ref()
			.ok_or(Error::NoBudget)?
			.reject_invoice(payment_id)?
			.into_iter()
			.map(|event| ProjectEvent::Budget { id: self.id, event })
			.collect())
	}

	pub fn apply(
		&self,
		applicant_id: UserId,
		application_id: ApplicationId,
	) -> Result<Vec<<Self as Aggregate>::Event>> {
		if self
			.applications()
			.iter()
			.any(|(_, application)| application.applicant_id() == &applicant_id)
		{
			return Err(Error::UserAlreadyApplied);
		}

		Ok(vec![ProjectEvent::Application {
			id: self.id,
			event: ApplicationEvent::Received {
				id: application_id,
				applicant_id,
				received_at: Utc::now().naive_utc(),
			},
		}])
	}
}

#[cfg(test)]
mod tests {
	use std::str::FromStr;

	use assert_matches::assert_matches;
	use rstest::{fixture, rstest};
	use rust_decimal_macros::dec;
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
	fn initial_budget() -> Amount {
		Amount::from_decimal(dec!(1000), currencies::USD)
	}

	#[fixture]
	fn project_created(project_id: ProjectId) -> ProjectEvent {
		ProjectEvent::Created { id: project_id }
	}

	#[fixture]
	fn budget_created(
		project_id: ProjectId,
		budget_id: BudgetId,
		initial_budget: Amount,
	) -> ProjectEvent {
		ProjectEvent::Budget {
			id: project_id,
			event: BudgetEvent::Created {
				id: budget_id,
				currency: initial_budget.currency(),
			},
		}
	}

	#[fixture]
	fn budget_allocated(
		project_id: ProjectId,
		budget_id: BudgetId,
		initial_budget: Amount,
	) -> ProjectEvent {
		ProjectEvent::Budget {
			id: project_id,
			event: BudgetEvent::Allocated {
				id: budget_id,
				amount: *initial_budget.amount(),
			},
		}
	}

	#[rstest]
	async fn test_create(project_id: ProjectId) {
		let events = Project::create(project_id);

		assert_eq!(events.len(), 1);
		assert_eq!(events[0], ProjectEvent::Created { id: project_id });
	}

	#[rstest]
	fn test_assign_leader(project_created: ProjectEvent, user_id: UserId, project_id: ProjectId) {
		let project = Project::from_events(&[project_created]);

		let events = project.assign_leader(user_id.to_owned()).unwrap();

		assert_eq!(events.len(), 1);
		assert_matches!(
			events[0],
			ProjectEvent::LeaderAssigned {
				id,
				leader_id,
				..
			} => {
				assert_eq!(id, project_id);
				assert_eq!(leader_id, user_id);
			}
		);
	}

	#[rstest]
	fn test_assign_twice_the_same_leader(project_created: ProjectEvent, user_id: UserId) {
		let project = Project::from_events(&[project_created]);
		let events = project.assign_leader(user_id.to_owned()).unwrap();
		let project = project.apply_events(&events);

		let result = project.assign_leader(user_id.to_owned());

		assert!(result.is_err());
		assert_matches!(result.unwrap_err(), Error::LeaderAlreadyAssigned);
	}

	#[rstest]
	fn allocate_budget(project_created: ProjectEvent, initial_budget: Amount) {
		let project = Project::from_events(&[project_created]);
		let events =
			project.allocate_budget(initial_budget).expect("Failed while allocating budget");

		assert_eq!(events.len(), 2);
		assert_matches!(
			events[0],
			ProjectEvent::Budget {
				id: _,
				event: BudgetEvent::Created { .. }
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
	fn user_cannot_apply_twice(project_created: ProjectEvent, user_id: UserId) {
		let project = Project::from_events(&[project_created]);
		let events = project.apply(user_id, Uuid::new_v4().into()).unwrap();
		let project = project.apply_events(&events);

		let result = project.apply(user_id, Uuid::new_v4().into());

		assert!(result.is_err());
		assert_matches!(result.unwrap_err(), Error::UserAlreadyApplied);
	}
}
