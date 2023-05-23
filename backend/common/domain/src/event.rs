/// This module defines an `Event` type which can wrap different types of project events.
/// It implements the `MessagePayload` trait for external message passing.
/// The `Display` trait is implemented to format the `Event` as a JSON string.
///
/// The following traits are derived:
///
/// * `Debug`
/// * `Clone`
/// * `PartialEq`
/// * `Eq`
/// * `Serialize`
/// * `Deserialize`
use std::fmt::Display;

use serde::{Deserialize, Serialize};

use crate::{MessagePayload, ProjectEvent};

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub enum Event {
    /// A project event
    Project(ProjectEvent),
}

impl Display for Event {
    /// Formats `self` as a JSON string using `serde_json::to_string()`
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