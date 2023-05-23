/// Events that can occur during the lifecycle of a `Project`.
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub enum Event {
	/// Event emitted when a `Project` is created.
	Created {
		id: ProjectId,
	},
	/// Event emitted when a leader is assigned to a `Project`.
	LeaderAssigned {
        /// The identifier of the `Project`.
		id: ProjectId,
        /// The identifier of the `User` assigned as the leader.
		leader_id: UserId,
	},
	/// Event emitted when the leader of a `Project` is unassigned.
	LeaderUnassigned {
        /// The identifier of the `Project`.
		id: ProjectId,
        /// The identifier of the `User` who was previously the leader.
		leader_id: UserId,
	},
	/// Event emitted when a budget-related change occurs within a `Project`.
	Budget {
        /// The identifier of the `Project`.
		id: ProjectId,
        /// The budget-related change that occurred.
		event: BudgetEvent,
	},
	/// Event emitted when a `GithubRepo` is linked to a `Project`.
	GithubRepoLinked {
        /// The identifier of the `Project`.
		id: ProjectId,
        /// The identifier of the `GithubRepo` being linked.
		github_repo_id: GithubRepoId,
	},
	/// Event emitted when a `GithubRepo` is unlinked from a `Project`.
	GithubRepoUnlinked {
        /// The identifier of the `Project`.
		id: ProjectId,
        /// The identifier of the `GithubRepo` being unlinked.
		github_repo_id: GithubRepoId,
	},
}

impl AggregateEvent<Project> for Event {
	/// Returns the identifier of the `Project` associated with the event.
	fn aggregate_id(&self) -> &ProjectId {
		match self {
			Self::Created { id, .. }
			| Self::LeaderAssigned { id, .. }
			| Self::LeaderUnassigned { id, .. }
			| Self::Budget { id, .. }
			| Self::GithubRepoLinked { id, .. }
			| Self::GithubRepoUnlinked { id, .. } => id,
		}
	}
}

impl Display for Event {
	/// Formats the event as a string for display purposes.
	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
		write!(
			f,
			"{}",
			serde_json::to_string(&self).map_err(|_| std::fmt::Error)?
		)
	}
}