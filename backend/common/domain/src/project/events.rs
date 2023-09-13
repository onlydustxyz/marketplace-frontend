use std::fmt::Display;

use chrono::NaiveDateTime;
use serde::{Deserialize, Serialize};

use crate::{AggregateEvent, BudgetId, GithubRepoId, Project, ProjectId, UserId};

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub enum Event {
	Created {
		id: ProjectId,
	},
	LeaderAssigned {
		id: ProjectId,
		leader_id: UserId,
		assigned_at: NaiveDateTime,
	},
	LeaderUnassigned {
		id: ProjectId,
		leader_id: UserId,
	},
	BudgetLinked {
		id: ProjectId,
		budget_id: BudgetId,
	},
	GithubRepoLinked {
		id: ProjectId,
		github_repo_id: GithubRepoId,
	},
	GithubRepoUnlinked {
		id: ProjectId,
		github_repo_id: GithubRepoId,
	},
	Applied {
		id: ProjectId,
		applicant_id: UserId,
	},
}

impl AggregateEvent<Project> for Event {
	fn aggregate_id(&self) -> &ProjectId {
		match self {
			Self::Created { id, .. }
			| Self::LeaderAssigned { id, .. }
			| Self::LeaderUnassigned { id, .. }
			| Self::BudgetLinked { id, .. }
			| Self::GithubRepoLinked { id, .. }
			| Self::GithubRepoUnlinked { id, .. }
			| Self::Applied { id, .. } => id,
		}
	}
}

impl Display for Event {
	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
		write!(
			f,
			"{}",
			serde_json::to_string(&self).map_err(|_| std::fmt::Error)?
		)
	}
}
