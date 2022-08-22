use std::fmt::Display;

use crate::*;
use serde::{Deserialize, Serialize};
use serde_json;

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub enum Event {
	Created {
		id: ContributionId,
		project_id: ProjectId,
		gate: u8,
	},
	Assigned {
		id: ContributionId,
		contributor_id: ContributorId,
	},
	Unassigned {
		id: ContributionId,
	},
	Validated {
		id: ContributionId,
	},
}

#[cfg(test)]
impl Default for Event {
	fn default() -> Self {
		Self::Created {
			id: Default::default(),
			project_id: Default::default(),
			gate: Default::default(),
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

#[cfg(test)]
mod test {
	use super::*;
	use assert_json_diff::assert_json_eq;
	use rstest::*;
	use serde_json::{json, Value};
	use uuid::Uuid;

	#[fixture]
	fn project_id() -> String {
		String::from("123")
	}

	#[fixture]
	fn contribution_id() -> ContributionId {
		Uuid::from_u128(456).into()
	}

	#[fixture]
	fn gate() -> u8 {
		1
	}

	#[fixture]
	fn contributor_id() -> ContributorId {
		ContributorId::from(666)
	}

	#[rstest]
	fn contribution_created_event_display_as_json(
		project_id: String,
		contribution_id: ContributionId,
		gate: u8,
	) {
		let event = Event::Created {
			project_id: project_id.clone(),
			id: contribution_id,
			gate,
		};

		assert_json_eq!(
			json! ({
				"Created": {
					"project_id": project_id,
					"id": contribution_id.to_string(),
					"gate": gate
				}
			}),
			serde_json::from_str::<Value>(&event.to_string()).unwrap()
		);
	}

	#[rstest]
	fn contribution_assigned_event_display_as_json(
		contribution_id: ContributionId,
		contributor_id: ContributorId,
	) {
		let event = Event::Assigned {
			id: contribution_id,
			contributor_id: contributor_id.clone(),
		};

		assert_json_eq!(
			json! ({
				"Assigned": {
					"id": contribution_id.to_string(),
					"contributor_id": contributor_id.to_string(),
				}
			}),
			serde_json::from_str::<Value>(&event.to_string()).unwrap()
		);
	}

	#[rstest]
	fn contribution_unassigned_event_display_as_json(contribution_id: ContributionId) {
		let event = Event::Unassigned {
			id: contribution_id,
		};

		assert_json_eq!(
			json! ({
				"Unassigned": {
					"id": contribution_id.to_string(),
				}
			}),
			serde_json::from_str::<Value>(&event.to_string()).unwrap()
		);
	}

	#[rstest]
	fn contribution_validated_event_display_as_json(contribution_id: ContributionId) {
		let event = Event::Validated {
			id: contribution_id,
		};

		assert_json_eq!(
			json! ({
				"Validated": {
					"id": contribution_id.to_string(),
				}
			}),
			serde_json::from_str::<Value>(&event.to_string()).unwrap()
		);
	}
}
