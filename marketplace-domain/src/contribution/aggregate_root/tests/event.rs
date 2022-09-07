use super::super::{ContributionId, *};
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
fn contributor_id() -> ContributorId {
	ContributorId::from(666)
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
	contributor_id: ContributorId,
) {
	let event = Event::Assigned {
		id: contribution_id.clone(),
		contributor_id: contributor_id.clone(),
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
	contributor_id: ContributorId,
) {
	let event = Event::Claimed {
		id: contribution_id.clone(),
		contributor_id: contributor_id.clone(),
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
