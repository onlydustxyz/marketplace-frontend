use std::collections::{HashMap, HashSet};

use crate::*;

#[derive(Default, Debug, Clone, PartialEq, Eq)]
pub struct State {
	pub id: ProjectId,
	pub leaders: HashSet<UserId>,
	pub budgets_by_currency: HashMap<String, BudgetId>,
	pub github_repos: HashSet<GithubRepoId>,
	pub applicants: HashSet<UserId>,
}

impl EventSourcable for State {
	type Event = ProjectEvent;
	type Id = ProjectId;

	fn apply_event(mut self, event: &Self::Event) -> Self {
		match event {
			ProjectEvent::Created { id } => State { id: *id, ..self },
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
