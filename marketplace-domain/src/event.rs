use crate::{ContributionEvent, ProjectEvent};
use serde::{Deserialize, Serialize};
use std::fmt::Display;

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub enum Event {
	Contribution(ContributionEvent),
	Project(ProjectEvent),
}

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct StorableEvent {
	pub event: Event,
	pub deduplication_id: String,
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

#[cfg(test)]
mod test {
	use super::*;
	use assert_json_diff::assert_json_include;
	use serde_json::{json, Value};

	#[test]
	fn display_event_as_json() {
		let event = Event::Contribution(ContributionEvent::default());
		assert_json_include!(
			actual: serde_json::from_str::<Value>(&event.to_string()).unwrap(),
			expected: json!({ "Contribution": { "Created": {} } })
		);
	}
}
