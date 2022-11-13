use std::fmt::Display;

use crate::*;
use chrono::NaiveDateTime;
use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub enum Event {
	Deployed {
		contract_address: ContractAddress,
	},
	Created {
		id: ContributionId,
		project_id: GithubProjectId,
		issue_number: GithubIssueNumber,
		gate: u8,
	},
	Applied {
		id: ContributionId,
		contributor_id: Uuid,
		applied_at: NaiveDateTime,
	},
	ApplicationRefused {
		id: ContributionId,
		contributor_id: Uuid,
	},
	Assigned {
		id: ContributionId,
		contributor_id: Uuid,
	},
	Claimed {
		id: ContributionId,
		contributor_id: Uuid,
	},
	Unassigned {
		id: ContributionId,
	},
	Validated {
		id: ContributionId,
	},
	GateChanged {
		id: ContributionId,
		gate: u8,
	},
	Closed {
		id: ContributionId,
	},
	Reopened {
		id: ContributionId,
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

impl From<Event> for crate::Event {
	fn from(event: Event) -> Self {
		crate::Event::Contribution(event)
	}
}

#[cfg(test)]
mod tests {
	use std::str::FromStr;

	use super::*;
	use assert_json_diff::assert_json_eq;
	use rstest::*;
	use serde_json::{json, Value};

	impl Default for Event {
		fn default() -> Self {
			Self::Created {
				id: Default::default(),
				project_id: Default::default(),
				issue_number: Default::default(),
				gate: Default::default(),
			}
		}
	}

	#[fixture]
	fn project_id() -> GithubProjectId {
		123
	}

	#[fixture]
	fn issue_number() -> GithubIssueNumber {
		456
	}

	#[fixture]
	fn gate() -> u8 {
		1
	}

	#[fixture]
	fn contributor_id() -> Uuid {
		Uuid::from_str("3d863031-e9bb-42dc-becd-67999675fb8b").unwrap()
	}

	#[fixture]
	fn contribution_id() -> ContributionId {
		ContributionId::from(456)
	}

	#[rstest]
	fn contribution_created_event_display_as_json(
		contribution_id: ContributionId,
		project_id: GithubProjectId,
		issue_number: GithubIssueNumber,
		gate: u8,
	) {
		let event = Event::Created {
			id: contribution_id.clone(),
			project_id,
			issue_number,
			gate,
		};

		assert_json_eq!(
			json! ({
				"Created": {
					"id": contribution_id,
					"project_id": project_id,
					"issue_number": issue_number,
					"gate": gate
				}
			}),
			serde_json::from_str::<Value>(&event.to_string()).unwrap()
		);
	}

	#[rstest]
	fn contribution_assigned_event_display_as_json(
		contribution_id: ContributionId,
		contributor_id: Uuid,
	) {
		let event = Event::Assigned {
			id: contribution_id.clone(),
			contributor_id,
		};

		assert_json_eq!(
			json! ({
				"Assigned": {
					"id": contribution_id,
					"contributor_id": contributor_id
				}
			}),
			serde_json::from_str::<Value>(&event.to_string()).unwrap()
		);
	}

	#[rstest]
	fn contribution_claimed_event_display_as_json(
		contribution_id: ContributionId,
		contributor_id: Uuid,
	) {
		let event = Event::Claimed {
			id: contribution_id.clone(),
			contributor_id,
		};

		assert_json_eq!(
			json! ({
				"Claimed": {
					"id": contribution_id,
					"contributor_id": contributor_id
				}
			}),
			serde_json::from_str::<Value>(&event.to_string()).unwrap()
		);
	}

	#[rstest]
	fn contribution_unassigned_event_display_as_json(contribution_id: ContributionId) {
		let event = Event::Unassigned {
			id: contribution_id.clone(),
		};

		assert_json_eq!(
			json! ({
				"Unassigned": {
					"id": contribution_id
				}
			}),
			serde_json::from_str::<Value>(&event.to_string()).unwrap()
		);
	}

	#[rstest]
	fn contribution_validated_event_display_as_json(contribution_id: ContributionId) {
		let event = Event::Validated {
			id: contribution_id.clone(),
		};

		assert_json_eq!(
			json!({
				"Validated": {
					"id": contribution_id
				}
			}),
			serde_json::from_str::<Value>(&event.to_string()).unwrap()
		);
	}

	#[rstest]
	fn gate_changed_event_display_as_json(contribution_id: ContributionId) {
		let event = Event::GateChanged {
			id: contribution_id.clone(),
			gate: 5,
		};

		assert_json_eq!(
			json!({
				"GateChanged": {
					"id": contribution_id,
					"gate": 5
				}
			}),
			serde_json::from_str::<Value>(&event.to_string()).unwrap()
		);
	}
}
