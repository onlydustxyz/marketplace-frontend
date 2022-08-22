use std::fmt::Display;

use crate::*;
use serde::{Deserialize, Serialize};
use serde_json;

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub enum Event {
	Created { project_id: ProjectId, gate: u8 },
	Assigned { contributor_id: ContributorId },
	Unassigned {},
	Validated {},
}

#[cfg(test)]
impl Default for Event {
	fn default() -> Self {
		Self::Created {
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

	#[fixture]
	fn project_id() -> String {
		String::from("123")
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
	fn contribution_created_event_display_as_json(project_id: String, gate: u8) {
		let event = Event::Created {
			project_id: project_id.clone(),
			gate,
		};

		assert_json_eq!(
			json! ({
				"Created": {
					"project_id": project_id,
					"gate": gate
				}
			}),
			serde_json::from_str::<Value>(&event.to_string()).unwrap()
		);
	}

	#[rstest]
	fn contribution_assigned_event_display_as_json(contributor_id: ContributorId) {
		let event = Event::Assigned {
			contributor_id: contributor_id.clone(),
		};

		assert_json_eq!(
			json! ({
				"Assigned": {
					"contributor_id": contributor_id
				}
			}),
			serde_json::from_str::<Value>(&event.to_string()).unwrap()
		);
	}

	#[rstest]
	fn contribution_unassigned_event_display_as_json() {
		let event = Event::Unassigned {};

		assert_json_eq!(
			json! ({
				"Unassigned": {
				}
			}),
			serde_json::from_str::<Value>(&event.to_string()).unwrap()
		);
	}

	#[rstest]
	fn contribution_validated_event_display_as_json() {
		let event = Event::Validated {};

		assert_json_eq!(
			json!({ "Validated": {} }),
			serde_json::from_str::<Value>(&event.to_string()).unwrap()
		);
	}
}
