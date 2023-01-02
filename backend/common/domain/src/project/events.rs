use std::fmt::Display;

use serde::{Deserialize, Serialize};

use crate::{BudgetEvent, GithubRepositoryId, ProjectId, UserId};

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub enum Event {
	Created {
		id: ProjectId,
		name: String,
		github_repo_id: GithubRepositoryId,
	},
	LeaderAssigned {
		id: ProjectId,
		leader_id: UserId,
	},
	LeaderUnassigned {
		id: ProjectId,
		leader_id: UserId,
	},
	GithubRepositoryUpdated {
		id: ProjectId,
		github_repo_id: GithubRepositoryId,
	},
	Budget {
		id: ProjectId,
		event: BudgetEvent,
	},
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
