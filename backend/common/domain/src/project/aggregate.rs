/// This module contains the `Project` entity as well as its related errors and types.
use std::collections::HashSet;

use chrono::Duration;
use derive_getters::{Dissolve, Getters};
use derive_more::Constructor;
use thiserror::Error;

use crate::{payment::Reason, *};

/// All the possible errors that can occur within the `Project` entity.
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
}

/// Main result type used by the `Project` module.
type Result<T> = std::result::Result<T, Error>;

/// The `Project` entity.
#[derive(Default, Debug, Clone, PartialEq, Eq, Getters, Dissolve, Constructor)]
pub struct Project {
    id: ProjectId,
    leaders: HashSet<UserId>,
    budget: Option<Budget>,
    github_repos: HashSet<GithubRepoId>,
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

/// Implementation of the `EventSourcable` trait for the `Project` entity.
impl EventSourcable for Project {
    fn apply_event(mut self, event: &Self::Event) -> Self {
        match event {
            ProjectEvent::Created { id } => Project { id: *id, ..Default::default() },
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
        }
    }
}

impl Project {
    /// Create a new `Project` given an `id`.
    /// Returns a vector of resulting events.
    pub fn create(id: ProjectId) -> Vec<<Self as Aggregate>::Event> {
        vec![ProjectEvent::Created { id }]
    }

    /// Allocate the `diff` amount to the project's budget.
    /// Returns a vector of resulting events, or an error if the budget was not created.
    pub fn allocate_budget(&self, diff: &Amount) -> Result<Vec<<Self as Aggregate>::Event>> {
        let events = match self.budget.as_ref() {
            Some(budget) => budget.allocate(*diff.amount())?,
            None => {
                let events = Budget::create(BudgetId::new(), diff.currency().clone());
                let budget = Budget::from_events(&events);
                events.into_iter().chain(budget.allocate(*diff.amount())?).collect()
            },
        };

        Ok(events
            .into_iter()
            .map(|event| ProjectEvent::Budget { id: self.id, event })
            .collect())
    }

    /// Assign a leader identified by `leader_id` to the project.
    /// Returns a vector of resulting events or an error if an error occurs.
    pub fn assign_leader(&self, leader_id: UserId) -> Result<Vec<<Self as Aggregate>::Event>> {
        if self.leaders.contains(&leader_id) {
            return Err(Error::LeaderAlreadyAssigned);
        }

        Ok(vec![ProjectEvent::LeaderAssigned { id: self.id, leader_id }])
    }

    /// Unassign the leader identified by `leader_id` to the project.
    /// Returns a vector of resulting events or an error if an error occurs.
    pub fn unassign_leader(&self, leader_id: UserId) -> Result<Vec<<Self as Aggregate>::Event>> {
        if !self.leaders.contains(&leader_id) {
            return Err(Error::NotLeader);
        }

        Ok(vec![ProjectEvent::LeaderUnassigned { id: self.id, leader_id }])
    }

    /// Link the github repository identified by `github_repo_id` to the project.
    /// Returns a vector of resulting events or an error if an error occurs.
    pub fn link_github_repo(
        &self,
        github_repo_id: GithubRepoId,
    ) -> Result<Vec<<Self as Aggregate>::Event>> {
        if self.github_repos.contains(&github_repo_id) {
            return Err(Error::GithubRepoAlreadyLinked);
        }

        Ok(vec![ProjectEvent::GithubRepoLinked { id: self.id, github_repo_id }])
    }

    /// Unlink the github repository identified by `github_repo_id` to the project.
    /// Returns a vector of resulting events or an error if an error occurs.
    pub fn unlink_github_repo(
        &self,
        github_repo_id: GithubRepoId,
    ) -> Result<Vec<<Self as Aggregate>::Event>> {
        if !self.github_repos.contains(&github_repo_id) {
            return Err(Error::NotLinked);
        }

        Ok(vec![ProjectEvent::GithubRepoUnlinked { id: self.id, github_repo_id }])
    }

    /// Request a payment using the budget, providing the `payment_id`, `requestor_id`,
    /// `recipient_id`, `amount`, `duration_worked` and the `reason`.
    /// Returns a vector of resulting events or an error if the budget was not created.
    #[allow(clippy::too_many_arguments)]
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

    /// Cancel the payment request identified by `payment_id`.
    /// Returns a vector of resulting events or an error if the budget was not created.
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

    /// Add the payment `receipt` for the payment identified by `payment_id`.
    /// Returns a vector of resulting events or an error if the budget was not created.
    pub async fn add_payment_receipt(
        &self,
        payment_id: &PaymentId,
        receipt_id: PaymentReceiptId,
        amount: Amount,
        receipt: PaymentReceipt,
    ) -> Result<Vec<<Self as Aggregate>::Event>> {
        Ok(self
            .budget
            .