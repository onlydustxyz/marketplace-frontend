use crate::{Aggregate, ContributionEvent, ContributorEvent, EventOrigin, Message, ProjectEvent};
use chrono::NaiveDateTime;
use serde::{Deserialize, Serialize};
use serde_json::Value;
use std::fmt::Display;

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub enum Event {
	Contribution(ContributionEvent),
	Project(ProjectEvent),
	Contributor(ContributorEvent),
}

// TODO: Remove after migration
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct StorableEvent<A: Aggregate> {
	pub event: A::Event,
	pub deduplication_id: String,
	pub timestamp: NaiveDateTime,
	pub metadata: Value,
	pub origin: EventOrigin,
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

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
pub enum Origin {
	Starknet,
	BACKEND,
}

impl Display for Origin {
	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
		write!(
			f,
			"{}",
			match self {
				Origin::Starknet => "starknet",
				Origin::BACKEND => "backend",
			}
		)
	}
}

impl Message for Event {}

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
