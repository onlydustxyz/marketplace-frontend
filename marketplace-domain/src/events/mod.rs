mod github_identifier_registered;
pub use github_identifier_registered::GithubIdentifierRegisteredEvent;

mod store;
pub use store::{Error as StoreError, Store};

mod aggregate;
pub use aggregate::Aggregate;

use crate::ContributionEvent;
use serde::{Deserialize, Serialize};
use std::fmt::Display;

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub enum Event {
	GithubIdentifierRegistered(GithubIdentifierRegisteredEvent),
	Contribution(ContributionEvent),
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
