use std::fmt::Display;

use serde::{Deserialize, Serialize};

use crate::{AggregateEvent, BudgetEvent, Project, ProjectId, UserId};

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub enum Event {
	Created { id: ProjectId },
	LeaderAssigned { id: ProjectId, leader_id: UserId },
	LeaderUnassigned { id: ProjectId, leader_id: UserId },
	Budget { id: ProjectId, event: BudgetEvent },
}

impl AggregateEvent<Project> for Event {
	fn aggregate_id(&self) -> &ProjectId {
		match self {
			Self::Created { id, .. }
			| Self::LeaderAssigned { id, .. }
			| Self::LeaderUnassigned { id, .. }
			| Self::Budget { id, .. } => id,
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
