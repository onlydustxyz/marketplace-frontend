use std::fmt::Display;

use serde::{Deserialize, Serialize};

use crate::{MessagePayload, ProjectEvent};

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub enum Event {
	Project(ProjectEvent),
}

impl Display for Event {
	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
		write!(
			f,
			"{}",
			serde_json::to_string(self).map_err(|_| std::fmt::Error)?
		)
	}
}

impl MessagePayload for Event {}

#[cfg(test)]
mod test {
	use assert_json_diff::assert_json_include;
	use serde_json::{json, Value};

	use super::*;

	#[test]
	fn display_event_as_json() {
		let event = Event::Project(ProjectEvent::LeaderAssigned {
			id: Default::default(),
			leader_id: Default::default(),
		});
		assert_json_include!(
			actual: serde_json::from_str::<Value>(&event.to_string()).unwrap(),
			expected: json!({ "Project": { "LeaderAssigned": {} } })
		);
	}
}
